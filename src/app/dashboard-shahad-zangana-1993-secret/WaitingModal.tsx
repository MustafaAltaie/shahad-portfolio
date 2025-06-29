import React from 'react';

const WaitingModal = () => {
    return (
        <div className="loadingModal flexCenter centeredElement gap-3">
            <h1 className='text-3xl'>Please wait</h1>
            <p>This might take a few seconds</p>
            <div className='loadingModalLight1'></div>
            <div className='loadingModalLight2'></div>
        </div>
    )
}

export default WaitingModal;

// .centeredElement {
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
// }

// .loadingModal {
//     z-index: 1000;
//     position: fixed;
//     width: 300px;
//     height: 200px;
//     backdrop-filter: blur(10px);
//     border-radius: 40px;
//     flex-direction: column;
//     overflow: hidden;
// }
// .loadingModal > h1 {
//     font-weight: bold;
// }

// .loadingModalLight1,
// .loadingModalLight2 {
//     position: absolute;
//     top: 50%;
//     transform: translateY(-50%);
//     filter: blur(50px);
//     width: 150px;
//     height: 150px;
//     border-radius: 50%;
// }
// .loadingModalLight1 {
//     background: #07f;
//     animation: moveLight1 ease-in-out infinite 5s;
// }
// .loadingModalLight2 {
//     background: #f0a;
//     animation: moveLight2 ease-in-out infinite 5s;
// }


// @keyframes moveLight1 {
//     0% {
//         left: -20%;
//     } 50% {
//         left: 80%;
//     } 100% {
//         left: -20%;
//     }
// }

// @keyframes moveLight2 {
//     0% {
//         left: 80%;
//     } 50% {
//         left: -20%;
//     } 100% {
//         left: 80%;
//     }
// }