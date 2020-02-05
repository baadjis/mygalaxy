import React  ,{ Component } from 'react'
import ReactDOM from 'react-dom'
import DataStorageContract from '../blockchainend/build/contracts/DataStorage.json'
import ipfs from './ipfs'
import getWeb3 from './getWeb3'
import truffleContract from 'truffle-contract'

export default class Datastorage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ipfsHash: '',
            web3: null,
            buffer: null,
            account: null,
            sizes:'',
            datajson:[],
            name:'',
            typeextension:''
        }
        this.getFile = this.getFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.instantiateContract=this.instantiateContract.bind(this)
        this.getdata=this.getdata.bind(this)
        this.searchfile=this.searchfile.bind(this)
        this.sortable=this.sortable.bind(this)
    }

    componentWillMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.
        
        getWeb3
            .then(results => {
                this.setState({
                    web3: results.web3
                })
                 this.instantiateContract()
                // Instantiate contract once web3 provided.
                //this.instantiateContract()
                this.sortable()
            })
            .catch(() => {
                console.log('Error finding web3.')
            })
    }

 instantiateContract() {
        /*
         * SMART CONTRACT EXAMPLE
         *
         * Normally these functions would be called in the context of a
         * state management library, but for convenience I've placed them here.
         */
       
        
        console.log(this.state.web3)
        
        const DataStorage = truffleContract(DataStorageContract)
        console.log(DataStorage)
        DataStorage.setProvider(this.state.web3.currentProvider)

        // Get accounts.
        this.state.web3.eth.getAccounts((err , accounts) => {
            console.log(accounts)
            DataStorage.deployed().then((instance) => {
               this.DataStorageInstance = instance
                this.setState({ 
                  
                    account: accounts[0]
                  
                 },this.getdata)
                // Get the value from the contract to prove it worked.
                //return this.state.DataStorageInstance.get.call(accounts[0])
            })
        })
    }
   async getdata(){
     var nbdata= await this.DataStorageInstance.getNbdata()
     console.log(nbdata)
     var datael={}
     this.setState({datajson:[]},async()=>{
        for ( var i=0;i<nbdata;i++){
            var nd = await this.DataStorageInstance.get(i)
            var np= await this.DataStorageInstance.getsizes(i)
            var ns= await this.DataStorageInstance.getdates(i)
            var dn= await this.DataStorageInstance.getdataname(i)
            var dt= await this.DataStorageInstance.getdatatype(i)
             datael={
                 datahash:nd,
                 datasize:np,
                 datadate:Date(ns),
                 dataname:dn.toString(),
                 datatype:dt
             }
             console.log(ns)
             console.log(datael)
             this.setState({
                 datajson:[...this.state.datajson,datael]
             },console.log(this.state.datajson))
         }

     })
     
   }
   sortable()
   {
    
        document.getElementById('tabledata').DataTable({
        "ordering": false // false to disable sorting (or any other option)
        });
        document.getElementById('tabledata').addClass('bs-select');
        
   }
    getFile(event) {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        const name = event.target.files[0].name;
        const lastDot = name.lastIndexOf('.');
      
        const fileName = name.substring(0, lastDot);
        const ext = name.substring(lastDot + 1);
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
            this.setState({ buffer: Buffer(reader.result),
            sizes:file.size,
            name:fileName,
            typeextension:ext
         })
            console.log('buffer', this.state.buffer)
        }
    }
     searchfile() {
        var input, filter, tables, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        console.log(filter)
        tables = document.getElementById("tabledata");
        tr = tables.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[0];
          if (td) {
            txtValue = td.textContent || td.innerText;
            console.log(txtValue)
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }       
        }
      }
    async onSubmit(event) {
        event.preventDefault()
        ipfs.files.add(this.state.buffer, (error, result) => {
            if (error) {
                console.error(error)
                return
            }
           const d=Date.now()
            this.DataStorageInstance.set(result[0].hash, d,this.state.sizes.toString() ,this.state.name,this.state.typeextension, { from: this.state.account }).then((r) => {
                this.setState({ ipfsHash: result[0].hash },async ()=>{
                    console.log('ifpsHash', this.state.ipfsHash)
                    
                     this.getdata()
                })
                
            })
        })
    }
    render() {

        return (
            <div>
            <header className="header" >
                <div className="logo" >
                    < span > < i class="fa fa-connectdevelop"> Yas! </i></span >
                </div>
                <nav className="nav">
                    <ul>
                        <li className="nav-search-input">
                            <input type="search"
                                className="nav-search"
                                placeholder="search"></input>
                            <span><i class="fa fa-search"></i></span >
                        </li>
                    </ul>
                </nav>

            </header>
            <div>
            <form id='captureMedia' onSubmit={this.onSubmit}>
            <input type='file' onChange={this.getFile} /><br/>
            <label htmlFor='keepFilename'><input type='checkbox' id='keepFilename' name='keepFilename' /> keep filename</label>
            <input type='submit' />
          </form>
          </div>
          <div  className="tablecontainer">
          <h1>your data</h1>
          <input type="text" id="myInput"  placeholder="Search for files.." title="Type in a name" onChange={this.searchfile} />
          <table id="tabledata" class="table table-striped table-bordered table-sm" cellSpacing="0" width="100%">
          <thead>
          <tr>
          <th class="th-sm">Filename</th>
          <th class="th-sm">Type </th>
          <th class="th-sm">Size <small>(bytes)</small></th>
          <th class="th-sm"> Date Modified </th>
          </tr>
          </thead>
          <tbody>
              {this.state.datajson.map( function(nextItem,j) {
                  return ( <tr key={nextItem.datahash}>
                      <td><a href={`https://127.0.0.1:3000/ipfs/${nextItem.datahash}`}>{nextItem.dataname}</a></td>
                    <td>{nextItem.datatype}</td>
                    <td>{nextItem.datasize}</td>
                    <td>{nextItem.datadate}</td>
                </tr>)
              })}
              </tbody>
          </table>
          </div>
          </div>
        )

    }
}