import React from 'react'
import { useState } from 'react';
import swal from 'sweetalert';
import ReactLoading from 'react-loading';
import axios from 'axios';
import { ethers } from 'ethers';
import { Input, Textarea, Button, FormElement, Dropdown } from "@nextui-org/react";



const initialValues = {
  dao_name: '',
  dao_short_desc: '',
  dao_desc: '',
  dao_logo: '',
  dao_chain: '',
};

const OnBoardDAO = () => {

  const [formdata, setformdata] = useState(initialValues);
  const [creator_address, setDao_creator_address] = useState('');
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = React.useState(new Set(["Ethereum"]));

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected],
  );
  initialValues.dao_chain = selectedValue;
  // console.log("value :", initialValues.dao_chain);

  const handleInputChange = (event: React.ChangeEvent<FormElement>) => {
    const { name, value } = event.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };

  const formSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    // event.preventDefault();
    // console.log('form data: ', formdata);
    const { dao_name, dao_chain } = formdata;
    let dao_creator_address = '';
    let msg = '';

    if (dao_name === '') {
      msg = 'Please enter DAO name.';
    } else if (dao_chain === '') {
      msg = 'Please enter the chain of your DAO.';
    }
    try {
      let provider = new ethers.providers.Web3Provider(window.ethereum);

      // MetaMask requires requesting permission to connect users accounts
      await provider.send('eth_requestAccounts', []);

      // The MetaMask plugin also allows signing transactions to
      // send ether and pay to change state within the blockchain.
      // For this, you need the account signer...
      let signer = provider.getSigner();
      // console.log(provider);
      const userAddr = await signer.getAddress();
      dao_creator_address = userAddr;
      // console.log("user's address is:", userAddr);
      setDao_creator_address(userAddr);
      try {
        await signer.signMessage(
          `Register ${formdata.dao_name} on the Drift-DAO platform.`
        );
      } catch (e) {
        return;
      }
    } catch (e) {
      console.log('error occurred:', e);
      swal({
        title: 'Error!',
        text: 'please install metamask',
        icon: 'error',
        buttons: {
          cancel: {
            text: 'Close',
            value: true,
            visible: true,
            className: '',
            closeModal: true,
          },
        },
      });
      return;
    }

    if (dao_creator_address === '') {
      msg = 'Please enter the wallet address of the creator of the DAO.';
    }

    if (msg) {
      swal({
        title: 'Error!',
        text: msg,
        icon: 'error',
        buttons: {
          cancel: {
            text: 'Close',
            value: true,
            visible: true,
            className: '',
            closeModal: true,
          },
        },
      });
    } else {
      setLoading(true);

      try {
        const result = await axios({
          method: 'post',
          url: 'https://www.backend.drift-dao.com/DAO',
          data: {
            ...formdata,
            dao_creator_address,
          },
        });
        // console.log(result);
        swal({
          title: 'Welcome to Drift-DAO',
          text: `We warm-heartedly welcome you to Drift-DAO.`,
          icon: 'success',
        });
        setformdata(initialValues);
        setLoading(false);
      } catch (err) {
        if (typeof err === "string") {
          console.log("error is:", err.toLowerCase());  // works, `e` narrowed to string
          setLoading(false);
          swal({
            title: 'An error occurred!',
            text: err.toLowerCase(),
            icon: 'error',
            buttons: {
              cancel: {
                text: 'Close',
                value: true,
                visible: true,
                className: '',
                closeModal: true,
              },
            },
          });
        } else if (err instanceof Error) {
          console.log("error is:", err.message);  // works, `e` narrowed to Error
          setLoading(false);
          swal({
            title: 'An error occurred!',
            text: err.message,
            icon: 'error',
            buttons: {
              cancel: {
                text: 'Close',
                value: true,
                visible: true,
                className: '',
                closeModal: true,
              },
            },
          });
        }
        else {
          return;
        }


      }
    }
  };


  return (
    <div
      className="text-white mx-auto py-7 min-h-screen"
      style={{ maxWidth: '500px' }}
    >
      <form className="flex flex-col gap-4 mx-4 my-10">
        <div>

          <div className="mb-2 block">
            <label htmlFor="name11" className="text-white">
              DAO name
            </label>
          </div>
          <Input
            width="80%"
            id="daoname11"
            placeholder="DAO name"
            type="text"
            value={formdata.dao_name}
            onChange={handleInputChange}
            name="dao_name"
            aria-labelledby="name"
            required={true}

          />

        </div>
        <div>
          <div className="mb-2 block">
            <label htmlFor="name11" className="text-white">
              DAO short description
            </label>

          </div>
          <Textarea
            id="dao_short_desc11"
            width="80%"
            aria-labelledby="message"
            value={formdata.dao_short_desc}
            onChange={handleInputChange}
            name="dao_short_desc"
            placeholder="One line description of DAO"
            rows={2}
            required={true}
          />

        </div>
        <div>
          <div className="mb-2 block">
            <label htmlFor="name11" className="text-white">
              DAO description
            </label>

          </div>
          <Textarea
            id="dao_desc11"
            width="80%"
            aria-labelledby="message"
            value={formdata.dao_desc}
            onChange={handleInputChange}
            name="dao_desc"
            placeholder="Brief description of DAO"
            rows={4}
            required={true}
          />

        </div>
        <div>
          <div className="mb-2 block">
            <label htmlFor="logo11" className="text-white">
              DAO logo URL
            </label>

          </div>
          <Input
            width="80%"
            id="dao_logo11"
            placeholder="URL of DAO's logo"
            type="text"
            value={formdata.dao_logo}
            onChange={handleInputChange}
            name="dao_logo"
            aria-labelledby="name"
            required={true}

          />

        </div>
        <div>
          <div className="mb-2 block ">
            <label htmlFor="countries" className="text-white">
              Select BlockChain
            </label>

          </div>
          <Dropdown >
            <Dropdown.Button style={{ width: "80%", border : "1px solid cyan" }} flat color="secondary" css={{ tt: "capitalize" }}>
              {selectedValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="primary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selected}
              onSelectionChange={setSelected}
            >
              <Dropdown.Item key="Ethereum">Ethereum</Dropdown.Item>
              <Dropdown.Item key="Polygon">Polygon (Matic)</Dropdown.Item>
              <Dropdown.Item key="Near">Near</Dropdown.Item>
              <Dropdown.Item key="Solana">Solana</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* <Select
            id="chain"
            name="dao_chain"
            required={true}
            value={formdata.dao_chain}
            onChange={handleInputChange}
          >
            <option>Ethereum</option>
            <option>Polygon (Matic)</option>
            <option>Near</option>
            <option>Solana</option>
          </Select> */}
        </div>
        <div>
          <div className="mb-2 block">
            <label htmlFor="logo11" className="text-white">
              Address of the creator of the DAO on Drift-DAO
            </label>

          </div>
          <Input
            width="80%"
            id="dao_creator_addr_11"
            placeholder="wallet address"
            type="text"
            value={creator_address}
            onChange={(e) => { }}
            name="dao_creator_address"
            aria-labelledby="name"
            required={true}
            disabled
          />

        </div>

        <Button
          size="lg"
          style={{ width: "80%" }}
          onClick={formSubmit}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-red-500"
          // gradientDuoTone="greenToBlue"
          type="submit"
        >
          {loading ? (
            <div className="flex ">
              <div className="pr-4">Please wait...</div>
              <div>
                <ReactLoading type="spin" color="#fff" height={30} width={30} />
              </div>
            </div>
          ) : (
            <div>Connect wallet & Submit</div>
          )}
        </Button>
      </form>
    </div>
  )
}

export default OnBoardDAO