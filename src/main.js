import './assets/css/style.css';

// 离线访问
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/service-worker.js').then(registration => {
//             console.log('SW registered: ', registration);
//         }).catch(registrationError => {
//             console.log('SW registration failed: ', registrationError);
//         });
//     });
// }

function component() {

    var element = document.createElement('div');
    var btn = document.createElement('button');

    btn.innerHTML = 'Click me and look at the console!';
    element.className = 'hello';
    element.innerHTML = 'Hello, webpack!';
    element.appendChild(btn);
    // element.classList.add('hello');

    btn.onclick = () => import(/* webpackChunkName: "print" */ './print').then(module => {
        var print = module.default;
        print();
    })

    return element;
}

document.getElementById('app').appendChild(component())