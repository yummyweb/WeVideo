pragma solidity ^0.8.0;

contract Contract {
  uint public videoCount = 0;
  string public name = "Contract";
  mapping(uint => Video) public videos;

  struct Video {
    uint id;
    string hash;
    string title;
    string issue;
    int likes;
    address author;
  }

  event VideoUploaded(
    uint id,
    string hash,
    string title,
    string issue,
    int likes,
    address author
  );

  constructor() public {

  }

  function uploadVideo(string memory _videoHash, string memory _title, string memory _issue) public {
    require(bytes(_videoHash).length > 0);
    require(bytes(_title).length > 0);
    require(bytes(_issue).length > 0);
    videoCount++;
    videos[videoCount] = Video(videoCount, _videoHash, _title, _issue, 0, msg.sender);
    emit VideoUploaded(videoCount, _videoHash, _title, _issue, 0, msg.sender);
  }

  function likeVideo(uint id, int _likes) public {
    videos[id].likes = _likes + 1;
  }

  function totalVideos() public returns(uint256) {
    return videoCount;
  }
}
