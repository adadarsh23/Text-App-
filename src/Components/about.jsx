
import React, { useState } from 'react';
import logo from '../../src/assets/Screenshot 2025-04-17 125408.png';
import Alerthead from './Alert';

function About() {
  const [alertData, setAlertData] = useState({ head: null, desc: null });

  const showAlert = (head, desc) => {
    setAlertData({ head, desc });
  };

  const [myStyle, setMyStyle] = useState({
    color: 'black',
    backgroundColor: 'white',
  });

  const toggleButton = () => {
    if (myStyle.color === 'black') {
      setMyStyle({ color: 'white', backgroundColor: 'black' });
      showAlert('Dark Mode Enabled', 'You have switched to dark mode.');
      console.log('Color changed to white, background to black');
    } else {
      setMyStyle({ color: 'black', backgroundColor: 'white' });
      showAlert('Light Mode Enabled', 'You have switched to light mode.');
      console.log('Color changed to black, background to white');
    }
  };

  return (
    <>
    <Alerthead head={alertData.head} desc={alertData.desc} />
      <div style={myStyle} >
        <div className='flex flex-end justify-end'>
          <label class="plane-switch ">
            <input type="checkbox" onClick={toggleButton} />
            <div>
              <div>
                <svg viewBox="0 0 13 13">
                  <path d="M1.55989957,5.41666667 L5.51582215,5.41666667 L4.47015462,0.108333333 L4.47015462,0.108333333 C4.47015462,0.0634601974 4.49708054,0.0249592654 4.5354546,0.00851337035 L4.57707145,0 L5.36229752,0 C5.43359776,0 5.50087375,0.028779451 5.55026392,0.0782711996 L5.59317877,0.134368264 L7.13659662,2.81558333 L8.29565964,2.81666667 C8.53185377,2.81666667 8.72332694,3.01067661 8.72332694,3.25 C8.72332694,3.48932339 8.53185377,3.68333333 8.29565964,3.68333333 L7.63589819,3.68225 L8.63450135,5.41666667 L11.9308317,5.41666667 C12.5213171,5.41666667 13,5.90169152 13,6.5 C13,7.09830848 12.5213171,7.58333333 11.9308317,7.58333333 L8.63450135,7.58333333 L7.63589819,9.31666667 L8.29565964,9.31666667 C8.53185377,9.31666667 8.72332694,9.51067661 8.72332694,9.75 C8.72332694,9.98932339 8.53185377,10.1833333 8.29565964,10.1833333 L7.13659662,10.1833333 L5.59317877,12.8656317 C5.55725264,12.9280353 5.49882018,12.9724157 5.43174295,12.9907056 L5.36229752,13 L4.57707145,13 L4.55610333,12.9978962 C4.51267695,12.9890959 4.48069792,12.9547924 4.47230803,12.9134397 L4.47223088,12.8704208 L5.51582215,7.58333333 L1.55989957,7.58333333 L0.891288881,8.55114605 C0.853775374,8.60544678 0.798421006,8.64327676 0.73629202,8.65879796 L0.672314689,8.66666667 L0.106844414,8.66666667 L0.0715243949,8.66058466 L0.0715243949,8.66058466 C0.0297243066,8.6457608 0.00275502199,8.60729104 0,8.5651586 L0.00593007386,8.52254537 L0.580855011,6.85813984 C0.64492547,6.67265611 0.6577034,6.47392717 0.619193545,6.28316421 L0.580694768,6.14191703 L0.00601851064,4.48064746 C0.00203480725,4.4691314 0,4.45701613 0,4.44481314 C0,4.39994001 0.0269259152,4.36143908 0.0652999725,4.34499318 L0.106916826,4.33647981 L0.672546853,4.33647981 C0.737865848,4.33647981 0.80011301,4.36066329 0.848265401,4.40322477 L0.89131128,4.45169723 L1.55989957,5.41666667 Z" fill="currentColor"></path>
                </svg>
              </div>
              <span class="street-middle"></span>
              <span class="cloud"></span>
              <span class="cloud two"></span>
            </div>
          </label>
        </div>
        <section className=" py-18 relative" >
          <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <div className="w-full justify-start items-center gap-8 grid lg:grid-cols-2 grid-cols-1">
              <div className="w-full flex-col justify-start lg:items-start items-center gap-10 inline-flex">
                <div className="w-full flex-col justify-start lg:items-start items-center gap-4 flex">
                  <h2 className=" text-4xl font-bold font-manrope leading-normal lg:text-start text-center" style={myStyle}>
                  Text is a free app that makes editing and formatting text simple. It lets you bold, italicize, underline, undo, redo, change text case, copy, paste, and remove extra spaces with ease.
                  </h2>
                  <p className=" text-base font-normal leading-relaxed lg:text-start text-center " style={myStyle}>
                    Our web application is designed to make text processing easy and efficient. It allows you to quickly
                    convert text to uppercase or lowercase, helping you manage and format your content with ease.
                    Additionally, you can remove any extra spaces, ensuring your text is clean and organized. For added
                    convenience, our app also offers a one-click copy-to-clipboard feature, making it simple to transfer
                    your processed text wherever you need it. Whether you're working on a document, email, or code, our
                    tool streamlines your workflow and saves you time.
                  </p>
                </div>
                <a
                  href="/"
                  className="inline-flex items-center px-5 py-2.5 me-2 mb-2 text-sm text-center focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-900 bg-stone-700 hover:bg-stone-800 text-white font-bold rounded"
                >
                  Get Start
                </a>
              </div>
              <img
                className="lg:mx-0 mx-auto h-full rounded-2xl object-cover"
                src={logo}
                alt="about Us image"
              />
            </div>
          </div>
        </section>
        <section className="id1 flex-1 py-12 md:py-24 dark:bg-white" style={myStyle}>
          <div className="container space-y-12 px-4 md:px-6" style={myStyle} >
            <div className="flex flex-col items-center justify-center space-y-2 text-center" style={myStyle}>
              <div className="space-y-2" style={myStyle}>
                <h4 className="text-4xl font-bold tracking-tighter sm:text-6xl" style={myStyle}>Copyright reserve all content Adarsh</h4>
                <p className="max-w-[700px]  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-black" style={myStyle}>
                  Copyright for a website protects the original content, design, and other creative elements from
                  unauthorized use.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;