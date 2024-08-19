import React, { Component } from 'react';
import Word from './Word';

const styles = require('./style.scss');


class Verse extends Component {
  shouldComponentUpdate(nextProps) {
    const conditions = [
      this.props.verse !== nextProps.verse,
      this.props.currentWord !== nextProps.currentWord,
      this.props.iscurrentVerse !== nextProps.iscurrentVerse
    ];

    if (this.props.match) {
      conditions.push(this.props.match.length !== nextProps.match.length);
    }

    return conditions.some(condition => condition);
  }

  handlePlay(verse) {
    const { audioActions, iscurrentVerse } = this.props;
    const {  setAyah, play } = audioActions;



    if (iscurrentVerse) {
      return;
    }

    setAyah(verse.verseKey);
    play();
  }



  renderText() {
    const {
      verse,
      currentVerse,
      audioActions,
    } = this.props; // eslint-disable-line max-len
    // NOTE: Some 'word's are glyphs (jeem). Not words and should not be clicked for audio
    const renderText = false; // userAgent.isBot;

    const text = verse.words.map((word) => ( // eslint-disable-line
      <Word
        word={word}
        key={`${word.position}-${word.code}-${word.lineNum}`}
        currentVerse={currentVerse}

        audioActions={audioActions}

        useTextFont={renderText}
      />
    ));

    return (
      <h1 className={`${styles.font} text-right text-arabic`}>
        <p>
          {text}
        </p>
      </h1>
    );
  }










  render() {
    const { verse, iscurrentVerse } = this.props;

    return (
      <div
        name={`verse:${verse.verseKey}`}
        className={`row ${iscurrentVerse && 'highlight'} ${styles.container}`}
      >
        {/* {this.renderControls()} */}
        <div className="col-md-11 col-sm-11">
          {this.renderText()}

        </div>
      </div>
    );
  }
}

Verse.propTypes = {
  verse:false,
  chapter: null,
  bookmarkActions: null,
  mediaActions:null,
  audioActions: null,
  match: null,
  isAuthenticated: false,

  currentWord: 0, // gets passed in an integer, null by default
  iscurrentVerse: false,
  currentVerse: "",
  userAgent:"", // eslint-disable-line
  isPdf: ""
};

Verse.defaultProps = {
  currentWord: null,
  isPdf: false
};

export default Verse;
