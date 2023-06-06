export function debounce(callback, seconds) {
    let intervalId = null;
    
    return function() {
        clearTimeout(intervalId);
        intervalId = setTimeout(() => {
            callback();
        }, seconds * 1000);
    };
}
