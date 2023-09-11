if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/sw.min.js?v=3.11.0",
                  { scope: "/" })
        .then(() => {
            console.info("SW Loaded");
        }, err => console.error("SW error: ", err));

    navigator.serviceWorker
        .ready
        .then(() => {
            console.info("SW Ready");
        });
}
