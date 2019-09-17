// live-server public
// BABEL COMPILER SCRIPT TO TRANSLATE OUR CODE INTO USABLE CODE
//       file we write      translated file              presets           **
// babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch

// ** --watch flag works like nodemon so we don't have to manually restart babel

// STATEFUL VS STATELESS COMPONENTS
// class-based components house some sort of state (also called stateful components)
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteOptions  = this.handleDeleteOptions.bind(this);
    this.handlePick           = this.handlePick.bind(this);
    this.handleAddOption      = this.handleAddOption.bind(this);
    this.handleDeleteOption   = this.handleDeleteOption.bind(this);

    this.state = {
      options: []
    };
  }

  // LIFECYCLE METHODS
  // only available in class-based components
  // fires when component is added to DOM
  componentDidMount () {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (error) {
      // do nothing
    }
  };
  // fires when components are changed
  componentDidUpdate (prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
    console.log('saving data');
  };
  // fires on page changes or when watched element is removed from DOM
  componentWillUnmount () {
    console.log('component will unmount');
  };

  // STATE MANIPULATION FROM CHILD-TO-PARENT
  // children can't pass state to parents, but can manipulate parent
  // state via sending functions to the parent that affect state there

  handleDeleteOptions () {
    // this function comes from a child button, but resets parent state
    this.setState(() => ({ options: [] }));
  };
  handlePick () {
      const randomNum = Math.floor(Math.random() * this.state.options.length);
      const option = this.state.options[randomNum];
      alert(option);
  };
  handleAddOption (option) {
    if (!option) {
      return 'Enter valid value.';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'Option already exists.';
    }

    this.setState((prevState) => ({ options: prevState.options.concat(option) }));
  };
  handleDeleteOption (optionToRemove) {
    this.setState((prevState) => ({
      // use filter to return a new array based on our condition below
      options: prevState.options.filter((option) => {
        // return 'true' to keep option, 'false' to remove option
        // can use shorthand syntax, but left like this for learning
        // we keep the options that AREN'T equal to optionToRemove
        return optionToRemove !== option;
      })
    }));
  };

  render() {
    const subtitle = 'Let an AI choose your fate!';
    

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action 
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options 
          options={this.state.options} 
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption 
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
};

class AddOption extends React.Component {
  constructor (props) {
    super(props);

    this.handleAddOption      = this.handleAddOption.bind(this);

    this.state = {
      error: undefined
    };
  }
  // here we keep the inner function to handle the form
  handleAddOption(e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    // this error fires from the handleAddOption in <Indecision />
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.option.value = '';
    }
  };

  render() {
    const pStyle = { color: 'red' };
    return (
      <div>
        {this.state.error && <p style={pStyle}>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
};

// stateless functional components hold no state, but can have props
const Header = (props) => {
    return (
      <div>
        <h1>{props.title}</h1>
        {props.subtitle && <h2>{props.subtitle}</h2>}
      </div>
    );
};

const Action = (props) => {
    return (
      <div>
        <button 
          onClick={props.handlePick}
          disabled={!props.hasOptions}
        >
          What should I do?
        </button>
      </div>
    );
};

const Options = (props) => {
    return (
      <div>
        <button onClick={props.handleDeleteOptions}>Remove All</button>
        {props.options.length === 0 && <p>Add Option!</p>}
        {
          props.options.map((option) => (
            <Option key={option} 
              optionText={option} 
              handleDeleteOption={props.handleDeleteOption}
            />
          ))
        }
      </div>
    );
};

const Option = (props) => {
    return (
      <div>
        {props.optionText}
        <button 
          onClick={(event) => {
            props.handleDeleteOption(props.optionText)
          }}
        >
          -
        </button>
      </div>
    );
};

// default props allow fallbacks for state
Header.defaultProps = {
  title: 'Indecision'
};

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));