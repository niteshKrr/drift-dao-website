import React from "react";
import { useState } from "react";
import swal from "sweetalert";
import ReactLoading from "react-loading";
import axios from "axios";
import { ethers } from "ethers";
import {
  Input,
  Textarea,
  Button,
  FormElement,
  Checkbox,
} from "@nextui-org/react";

const initialValues = {
  dao_name: "",
  dao_short_desc: "",
  dao_desc: "",
  dao_logo: "",
  dao_chain: ["ethereum"],
};

const OnBoardDAO = () => {
  const [formdata, setformdata] = useState(initialValues);
  const [creator_address, setDao_creator_address] = useState("");
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = React.useState(initialValues.dao_chain);

  const handleInputChange = (event: React.ChangeEvent<FormElement>) => {
    const { name, value } = event.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };

  const formSubmit = async () => {
    const { dao_name, dao_chain } = formdata;
    let dao_creator_address = "";
    let msg = "";

    if (dao_name === "") {
      msg = "Please enter DAO name.";
    } else if (dao_chain.length === 0) {
      msg = "Please enter the chain of your DAO.";
    }
    try {
      let provider = new ethers.providers.Web3Provider(window.ethereum);

      // MetaMask requires requesting permission to connect users accounts
      await provider.send("eth_requestAccounts", []);

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
      console.log("error occurred:", e);
      swal({
        title: "Error!",
        text: "please install metamask",
        icon: "error",
        buttons: {
          cancel: {
            text: "Close",
            value: true,
            visible: true,
            className: "",
            closeModal: true,
          },
        },
      });
      return;
    }

    if (dao_creator_address === "") {
      msg = "Please enter the wallet address of the creator of the DAO.";
    }

    if (msg) {
      swal({
        title: "Error!",
        text: msg,
        icon: "error",
        buttons: {
          cancel: {
            text: "Close",
            value: true,
            visible: true,
            className: "",
            closeModal: true,
          },
        },
      });
    } else {
      setLoading(true);

      try {
        const result = await axios({
          method: "post",
          url: "https://www.backend.drift-dao.com/DAO",
          data: {
            ...formdata,
            dao_creator_address,
          },
        });
        // console.log(result);
        swal({
          title: "Welcome to Drift-DAO",
          text: `We warm-heartedly welcome you to Drift-DAO.`,
          icon: "success",
        });
        setformdata(initialValues);
        setLoading(false);
      } catch (err) {
        if (typeof err === "string") {
          console.log("error is:", err.toLowerCase()); // works, `e` narrowed to string
          setLoading(false);
          swal({
            title: "An error occurred!",
            text: err.toLowerCase(),
            icon: "error",
            buttons: {
              cancel: {
                text: "Close",
                value: true,
                visible: true,
                className: "",
                closeModal: true,
              },
            },
          });
        } else if (err instanceof Error) {
          console.log("error is:", err.message); // works, `e` narrowed to Error
          setLoading(false);
          swal({
            title: "An error occurred!",
            text: err.message,
            icon: "error",
            buttons: {
              cancel: {
                text: "Close",
                value: true,
                visible: true,
                className: "",
                closeModal: true,
              },
            },
          });
        } else {
          return;
        }
      }
    }
  };

  return (
    <div className="text-white py-7 min-h-screen">
      <form className="my-10" style={{ width: "700px" }}>
        <div>
          <div className="my-3 ">
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
          <div className="my-3 ">
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
          <div className="my-3 ">
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
          <div className="my-3 ">
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
          <div className="my-3  ">
            <label htmlFor="alpha" className="text-white text-lg">
              Select BlockChain
            </label>
            <div>
              <Checkbox.Group
                aria-labelledby="Select BlockChain"
                id="alpha"
                defaultValue={selected}
                onChange={setSelected}
              >
                <Checkbox value="ethereum">
                  <div className="text-white">Ethereum</div>
                </Checkbox>
                <Checkbox value="polygon">
                  <div className="text-white">Polygon (Matic)</div>
                </Checkbox>
                <Checkbox value="near">
                  <div className="text-white">Near</div>
                </Checkbox>
                <Checkbox value="solana">
                  <div className="text-white">Solana</div>
                </Checkbox>
              </Checkbox.Group>
            </div>
          </div>
        </div>
        <div>
          <div className="my-3 ">
            <label htmlFor="logo11" className="text-white">
              address of DAO-creator
            </label>
          </div>
          <Input
            width="80%"
            id="dao_creator_addr_11"
            placeholder="wallet address"
            type="text"
            value={creator_address}
            onChange={(e) => {}}
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
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-red-500 my-6"
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
  );
};

export default OnBoardDAO;
