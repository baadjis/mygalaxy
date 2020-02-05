pragma solidity ^ 0.5.7;

contract DataStorage {
  string[] ipfsHashs;
  uint Nbdata=0;
  uint[] addate;
  string[] sizes;
  string[] dataname;
  string[] datatype ;
  mapping (string => bool) added;
  function set(string memory x, uint datenow, string memory size, string memory name, string memory datatp) public{
    require(added[x]==false, "already added");
    ipfsHashs.push(x);
    Nbdata += 1;
    added[x] = true;
    addate.push(datenow);
    sizes.push(size);
    dataname.push(name);

    datatype.push(datatp);
  }

  function get(uint id) public view returns (string memory) {
    return ipfsHashs[id];
  }
  function getdates(uint id)public view returns (uint){
   return addate[id];
  }
  function getsizes(uint id)public view returns (string memory){
   return sizes[id];
  }
  function getNbdata()public view returns (uint){
      return (Nbdata);
  }
   function getdatatype(uint id)public view returns (string memory){
      return datatype[id];
  }
   function getdataname(uint id)public view returns (string memory){
      return dataname[id];
  }
}