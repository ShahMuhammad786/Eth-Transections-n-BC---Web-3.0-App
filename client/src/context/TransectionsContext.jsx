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
    const [transections, setTransections] = useState([])

    const handleChange = (e, name) => {
        setFormData((prevState)=>({ ...prevState, [name]:e.target.value}));
    }

    const getAllTransections = async () => {
        try {
            if(!ethereum) return alert("Please Install metamask."); // check if there is no metamask
            const transectionsContract = getEthereumContract();

            const availableTrasections = await transectionsContract.getAllTransections();

            //to get all the transections in a proper structure
            const structuredTransections = await availableTrasections.map((transection)=>({
                addressTo: transection.recieve,
                addressFrom: transection.sender,
                timeStamp: new Date(transection.timestamp.toNumber() * 1000).toLocaleString(),
                message: transection.message,
                keyword: transection.keyword,
                amount: parseInt(transection.amount._hex)/(10 ** 18)

            }))
            setTransections(structuredTransections);
            console.log(structuredTransections);


        } catch (error) {
            console.log(error)
        }
    }

    const checkIfWalledIsConnected = async () => {
        try {
            if(!ethereum) return alert("Please Install metamask.");

            const accounts = await ethereum.request({ method: 'eth_accounts'}); //request to metamask account
            if(accounts.length){
                setCurrentAccount(accounts[0])
                
                //getAllTransections
                getAllTransections();
                
            }else{
                console.log("No Accounts Found!")
            }

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum Object.");
        }
    }

    const checkIfTransectionsExist = async () => {
        try {
            const transectionsContract = getEthereumContract();        
            const transectionsCount = await transectionsContract.getTransectionCount();

            window.localStorage.setItem("transectionsCount", transectionsCount)
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
        checkIfTransectionsExist();
    }, []);

    return(
        <TransectionsContext.Provider value={{connectWallet, currentAccount, formData, sendTransection, handleChange}}>
            {children}
        </TransectionsContext.Provider>
    );
} 