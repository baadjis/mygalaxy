import React from 'react'
import Web3 from 'web3'

 let getWeb3 =() => new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    console.log("hi before")
    window.addEventListener('load',  async() =>{
        await window.ethereum.enable()
        var results
        
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
            try {
                console.log(window.ethereum)
                await window.ethereum.enable();
                // Acccounts now exposed
                results = {
                    web3: web3
                }
                resolve(results)
            } catch (error) {
                eject(error)
                // User denied account access...
                console.log("nothinng")
            }
            
        }
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)sss
       else if (window.web3) {
            // Use Mist/MetaMask's provider.

            
           
          const web3 = new Web3(window.web3.currentProvider)
            results = {
                web3: web3
            }

           // console.log('Injected web3 detected.');

            resolve(results)
        } else {
            // Fallback to localhost if no web3 injection. We've configured this to
            // use the development console's port by default.
            var provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545')

           const web3 = new Web3(provider)

            results = {
                web3: web3
            }

            console.log('No web3 instance injected, using Local web3.');

            resolve(results)
        }
    })
    
})

export default getWeb3

