import React, {useEffect, useState} from "react";
import {ethers} from 'ethers';

import {contractABI, contractAddress} from '../utils/constants';

export const TransectionsContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () =>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transectionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transectionContract;
}

export const TransectionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState();
    const [formData, setFormData] = useState({addressTo:'', amount: '', keyword: '', message:''});
    const [isLoading, setIsLoading] = useState(false)
    const [transectionCount, setTransectionCount] = useState(localStorage.getItem('transectionCount'));


    const handleChange = (e, name) => {
        setFormData((prevState)=>({ ...prevState, [name]:e.target.value}));
    }


    const checkIfWalledIsConnected = async () => {
        try {
            if(!ethereum) return alert("Please Install metamask.");

            const accounts = await ethereum.request({ method: 'eth_accounts'}); //request to metamask account
            if(accounts.length){
                setCurrentAccount(accounts[0])

                
                //getAllTransections
                
            }else{
                console.log("No Accounts Found!")
            }

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum Object.");
        }
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please Install metamask."); 

            const accounts = await ethereum.request({ method: 'eth_requestAccounts'}); //request to metamask account
            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum Object.");
        }
    }

    const sendTransection = async () =>{
        try {
            //check whether metamast is installed or not
            if(!ethereum) return alert("Please Install metamask."); 

            //get data from the form
            const {addressTo, amount, keyword, message} = formData;
            const transectionsContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount)

            //sending an etheruems
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                  from: currentAccount,
                  to: addressTo,
                  gas: "0x5208",
                  value: parsedAmount._hex,
                }],
              });

            //to store the transection in BC
            const transectionHash = await transectionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

            setIsLoading(true);
            console.log(`Loading - ${transectionHash.hash}`);
            await transectionHash.wait();
            console.log(`Success - ${transectionHash.hash}`);
            setIsLoading(false);

            const transectionsCount = await transectionsContract.getTransectionCount();

            setTransectionCount(transectionsCount.toNumber());


        } catch (error) {
            console.log(error);
            throw new Error("No ethereum Object.");
        }
    }

    useEffect(()=>{
        checkIfWalledIsConnected();
    }, []);

    return(
        <TransectionsContext.Provider value={{connectWallet, currentAccount, formData, sendTransection, handleChange}}>
            {children}
        </TransectionsContext.Provider>
    );
} 