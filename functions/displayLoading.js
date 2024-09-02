let loading = new MessageChannel();
globalThis: loading

globalThis: done = 0

function displayLoading() {

    //const loading = document.getElementById('loading')
    //loading.style.display = 'flex'
    loading.port1.onmessage = (event) => {
        const { done } = event.data;
        const loadingProgress = (done / allItems) * 100;
        console.log(`Loading progress: ${loadingProgress}%`)
    }
    onmessage = (event) => {
        const { done } = event.data;
        const loadingProgress = (done / allItems) * 100;
        console.log(`Loading progress: ${loadingProgress}%`)
}}

loading.port1.onmessage = (event) => {
    console.log('Message received on port1:', event.data);
  };