console.log("Hello world!");
function debounce(cb, delay = 1000) {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}
 async function updateDatalist() {
     const inputValue = document.getElementById('inputField').value;
    if(inputValue.length == 0) return;
      try {
        // Send a GET request to the Fastify endpoint
              const response = await fetch(`http://localhost:3000/data?input=${encodeURIComponent(inputValue)}`);

        // Check if the response is okay (status in the range 200-299)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse the JSON data from the response
        const data = await response.json();

        // Get the datalist element
        const datalist = document.getElementById('suggestions');

        // Clear existing options
        datalist.innerHTML = '';

        // Populate the datalist with new options
        data.forEach(item => {
          const option = document.createElement('option');
          option.value = `${item.Security} | ${item.Symbol}`; // Set the option value to the data item
          datalist.appendChild(option);
        });
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }

const debouncedUpdateDatalist = debounce(updateDatalist, 300);
document.getElementById('inputField').addEventListener('input', debouncedUpdateDatalist);
