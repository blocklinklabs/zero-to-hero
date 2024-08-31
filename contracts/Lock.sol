pragma solidity ^0.8.24;

import "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Lock is FunctionsClient, ConfirmedOwner, ERC20 {
    uint public unlockTime;
    address payable public owner;
    
    address public upkeepContract;
    bytes public request;
    uint64 public subscriptionId;
    uint32 public gasLimit;
    bytes32 public donID;
    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;

    uint public storedUSDValue;
    AggregatorV3Interface internal ethUsdPriceFeed;

    uint256 public constant REWARD_AMOUNT = 100 * 10**18; // 100 tokens
    uint256 public constant REWARD_INTERVAL = 1 days;
    mapping(address => uint256) public lastRewardTime;

    event Withdrawal(uint amount, uint when);
    event Response(bytes32 indexed requestId, bytes response, bytes err);
    event Reward(address indexed user, uint256 amount);

    error NotAllowedCaller(address caller, address owner, address automationRegistry);
    error UnexpectedRequestID(bytes32 requestId);

    constructor(uint _unlockTime, address router, address _priceFeed) 
        payable 
        FunctionsClient(router) 
        ConfirmedOwner(msg.sender)
        ERC20("RewardToken", "RWT")
    {
        require(block.timestamp < _unlockTime, "Unlock time should be in the future");
        unlockTime = _unlockTime;
        owner = payable(msg.sender);
        ethUsdPriceFeed = AggregatorV3Interface(_priceFeed);
        _mint(address(this), 1000000 * 10**18); // Mint 1 million tokens to the contract
    }

    modifier onlyAllowed() {
        if (msg.sender != owner() && msg.sender != upkeepContract)
            revert NotAllowedCaller(msg.sender, owner(), upkeepContract);
        _;
    }

    function setAutomationCronContract(address _upkeepContract) external onlyOwner {
        upkeepContract = _upkeepContract;
    }

    function updateRequest(
        bytes memory _request,
        uint64 _subscriptionId,
        uint32 _gasLimit,
        bytes32 _donID
    ) external onlyOwner {
        request = _request;
        subscriptionId = _subscriptionId;
        gasLimit = _gasLimit;
        donID = _donID;
    }

    function sendRequestCBOR() external onlyAllowed returns (bytes32 requestId) {
        s_lastRequestId = _sendRequest(
            request,
            subscriptionId,
            gasLimit,
            donID
        );
        return s_lastRequestId;
    }

    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId);
        }
        s_lastResponse = response;
        s_lastError = err;
        
        // Assuming the response is a uint256 representing the USD value
        if (response.length > 0) {
            storedUSDValue = abi.decode(response, (uint256));
        }
        
        emit Response(requestId, s_lastResponse, s_lastError);
    }

    function getLatestETHPrice() public view returns (int) {
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = ethUsdPriceFeed.latestRoundData();
        return price;
    }

    function claimReward() external {
        require(block.timestamp >= lastRewardTime[msg.sender] + REWARD_INTERVAL, "Reward not yet available");
        require(balanceOf(address(this)) >= REWARD_AMOUNT, "Not enough tokens in contract");

        lastRewardTime[msg.sender] = block.timestamp;
        _transfer(address(this), msg.sender, REWARD_AMOUNT);

        emit Reward(msg.sender, REWARD_AMOUNT);
    }

    function withdraw() public {
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}