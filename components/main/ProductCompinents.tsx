import React from 'react'
import Image from 'next/image';

const ProductCompinents = () => {
  return (
    <div className="bg-[url('/images/bg/bg2.jpg')] " id="product">
      <div className="py-24">
        <div className="font-bold font-mono text-white text-5xl text-center">
          All in one
        </div>
        <div className="font-bold font-mono text-white text-5xl text-center py-2">
          place
        </div>
        <div className="md:flex justify-around items-center justify-items-center md:my-16 ">
          <div
            className="justify-center justify-items-center px-3"
            // style={{ height: '80vh', width: '40vw' }}
          >
            <Image
              src="/images/app-drift-dao.png"
              height={"600"}
              width={"1012"}
              alt="load.."
            />
          </div>
          <div className=" my-24 mx-8">
            <ul
              className="mx-4 text-pink-500 "
              style={{ listStyleType: "circle" }}
            >
              <li className="my-2 font-bold font-mono text-xl ">
                Access all your DAOs in one app 🧑‍💻
              </li>
              <li className="my-2 font-bold font-mono text-xl">
                Chat with fellow DAO members 📱💬
              </li>
              <li className="my-2 font-bold font-mono text-xl">
                Create posts in discussion forum 🐧
              </li>
              <li className="my-2 font-bold font-mono text-xl">
                Vote on RFPs 🔥{" "}
              </li>
              <li className="my-2 font-bold font-mono text-xl">
                Vote on snapshots 🗳️
              </li>
              <li className="my-2 font-bold font-mono text-xl">
                Composable data 🥳
              </li>
              <li className="my-2 font-bold font-mono text-xl">
                And, much more...🚀
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCompinents