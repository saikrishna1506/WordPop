

async function fetchRandomWord() {
    const url = 'https://random-words5.p.rapidapi.com/getRandom';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '489d7b6516mshe9eb56f44c9ff45p14c1a4jsnb75dd4012686',
        'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
      }
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
      return result; // Return the word from the Random Words API
    } catch (error) {
      console.error('Error fetching random word:', error);
      throw error;
    }
  }
  

async function fetchWord(word) {
        try {
          const url = `https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${word}`;
          const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': '489d7b6516mshe9eb56f44c9ff45p14c1a4jsnb75dd4012686',
              'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
            }
          };
      
          const response = await fetch(url, options);
          const data = await response.json();
      
          console.log('Dictionary API (Ninja API) Response:', data);
      
          if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status}`);
          }
      
          if (data.valid && data.definition && data.word) {
            const word = data.word;
            const definition = data.definition;
            return { word, definition };
          } else {
            throw new Error('Empty response or invalid format');
          }
        } catch (error) {
          console.error('Error fetching word:', error);
          return null;
        }
      }
  
  async function updateWordAndMeaning() {
    const wordElement = document.getElementById('word');
    const meaningElement = document.getElementById('meaning');
  
    try {
      const randomWord = await fetchRandomWord();
      const wordData = await fetchWord(randomWord);
  
      wordElement.textContent = wordData.word;
      meaningElement.textContent = wordData.definition;
    } catch (error) {
      console.error('Error updating word and meaning:', error);
      wordElement.textContent = 'Error fetching word';
      meaningElement.textContent = 'Error fetching meaning';
    }
  }
  
  // Fetch and update word when the popup is opened
  document.addEventListener('DOMContentLoaded', updateWordAndMeaning);


  