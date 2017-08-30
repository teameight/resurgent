import React from 'react';
import { withRouter } from 'react-router-dom';

class BookConfirm extends React.Component {
  render() {

    return (
      <section className="main book-confirm">
            <header>
                <p className="subtitle">You have requested a session with</p>
                <h1 className="page-title">[Provider Name]</h1>
            </header>
            <p className="instruction">You will receive an email confirmation</p>
            <div className="token-wrap">
                <div className="token-spinner">
                    <ul>
                        <li>45</li>
                        <li>46</li>
                        <li>47</li>
                        <li>48</li>
                        <li>49</li>
                        <li>50</li>
                    </ul>
                </div>
                <span>Tokens</span>
            </div>
            <a className="btn" onClick={() => this.props.history.goBack()}>Back to Provider</a>
        </section>
    )
  }
}

export default withRouter(BookConfirm);