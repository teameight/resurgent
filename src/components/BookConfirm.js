import React from 'react';
import { withRouter } from 'react-router-dom';

class BookConfirm extends React.Component {
  
  constructor(props) {
      super(props);
      
      this.processLink= this.processLink.bind(this);
      
  }

  processLink(e, path) {
    e.preventDefault();
    this.props.history.push(path);
  };

  render() {

    const user = this.props.users;
    const pId = this.props.selectedProvider;
    const provider = this.props.providers[pId];
    let pName = '';
    let pTokens = '';

    if(pId){
      pName = this.props.providers[pId].name;
      pTokens = this.props.providers[pId].tokens;
    }

    let tokenCounts = [];
    for (var i = user.tokens; i <= user.tokens + pTokens; i++) {
      tokenCounts.push(<li>{i}</li>);
    }

    return (
      <section className="main book-confirm">
            <header>
                <p className="subtitle">You have requested a session with</p>
                <h1 className="page-title">{pName}</h1>
            </header>
            <p className="instruction">You will receive an email confirmation</p>
            <div className="token-wrap">
                <div className="token-spinner">
                    <ul>
                      { tokenCounts }
                    </ul>
                </div>
                <span>Tokens</span>
            </div>
            <a className="btn" onClick={() => this.props.history.go(-2)}>Back to Provider</a>
        </section>
    )
  }
}

export default withRouter(BookConfirm);