import React, {useRef, useState, KeyboardEvent} from 'react';
import '../styles/main.scss';
import keys from '../helpers/keyCodes';

const EXAMPLE_DATA = [
  {
    name: 'America',
    id: '1'
  },
  {
    name: 'Spain',
    id: '2'
  },
  {
    name: 'France',
    id: '3'
  },
  {
    name: 'Germany',
    id: '4'
  },
]

const Autocomplete = () => {

  const [isVisible, setIsMenuVisible] = useState(false);
  const [results, setResults] = useState<{ id: string, name: string }[]>([]);
  const [text, setText] = useState('')
  const [resultsCount, setResultsCount] = useState(0)
  const onTextBoxKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case keys.esc:
      case keys.upArrow:
      case keys.leftArrow:
      case keys.rightArrow:
      case keys.space:
      case keys.enter:
      case keys.tab:
      case keys.shift:
        // ignore otherwise the menu will show
        break;
      case keys.downArrow:
        onTextBoxDownPressed(event);
        break;
      default:
        onTextBoxType(event);
    }
  }

  const onTextBoxDownPressed = (event: KeyboardEvent<HTMLInputElement>) => {
    console.log('onTextBoxDownPressed')
  }

  const getOptions = (userInput: string) => {

    let matches: Array<{ id: string, name: string }> = [];
  
    // Loop through each of the option elements
    EXAMPLE_DATA.forEach(function(i, el) {
  
      // if the option has a value and the option’s text node matches the user-typed value
      if(i.name.trim().length > 0 && i.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1) {
  
        // push an object representation to the matches array
        matches.push({ name: i.name, id: i.id });
      }
    });
  
    return matches;
  };

  const onTextBoxType = (event: KeyboardEvent<HTMLInputElement>) => {
      // only show options if user typed something
      console.log('text', text)
    if (text.length > 0) {
      // get options based on value
      const options = getOptions(text.toLowerCase());
      console.log(options)
      setResults(options);
      // build the menu based on the options
      // buildMenu(options);

      // show the menu
      setIsMenuVisible(true);

      // update the live region
      setResultsCount(options.length);
  } else {
    setResults([]);
    setResultsCount(0);
  }

  // update the select box value which
  // the server uses to process the data
    // updateSelectBox();
  }

  const handleOnTexBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const onTextBoxKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case keys.tab:
        setIsMenuVisible(false);
    }
  }

  const createMenu = () => {

  }

  const onOptionClick = () => {
    // var option = $(e.currentTarget);
    // this.selectOption(option);
  };

  return (
    <div className='autocomplete'>
      <input
        aria-owns="autocomplete-options--destination"
        autoCapitalize="none"
        type="text"
        autoComplete="off" 
        aria-autocomplete="list"
        role="combobox"
        id="destination"
        aria-expanded={isVisible ? "true" : "false"}
        onKeyUp={onTextBoxKeyUp}
        onChange={handleOnTexBoxChange}
        onKeyDown={onTextBoxKeyDown}
      />
      {isVisible && (
        <ul id="autocomplete-options--destination" role="listbox" className="hidden">
          {results.map(d => (
            <li key={d.id} role="option" tabIndex={-1} aria-selected="false" data-option-value={d.id} id={`autocomplete_${d.id}`}>
              {d.name}
            </li>
          ))}
        </ul>
      )}
        <div aria-live="polite" role="status" className="sr-only">
        {resultsCount || 'No'} result{resultsCount !== 1 ? 's' : '' } available.
        </div>
    </div>
  );
};

Autocomplete.propTypes = {
  
};

export default Autocomplete;