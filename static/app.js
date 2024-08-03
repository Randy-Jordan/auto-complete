console.log("Hello world!");

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
document.getElementById('inputField').addEventListener('input', updateDatalist);
