import React, { Component } from 'react';
import { zeroPad } from './StringHelpers';
import "./quran.css"

/* eslint-disable no-unused-vars */
const CHAR_TYPE_WORD = 'word';
const CHAR_TYPE_END = 'end';
const CHAR_TYPE_PAUSE = 'pause';
const CHAR_TYPE_RUB = 'rub';
const CHAR_TYPE_SAJDAH = 'sajdah';

class Word extends Component {

    zeroPad = (num, places, padChar = '0') => { // eslint-disable-line
        const zero = (places - num.toString().length) + 1;

        return Array(+(zero > 0 && zero)).join(padChar) + num;
    }

    handleWordPlay = () => {
        const { word } = this.props;

        if (word.audio) {
            const audio = new Audio(word.audio.url); // eslint-disable-line

            audio.play();
        }
    }

    handleSegmentPlay = () => {
        const { word, currentVerse, audioActions } = this.props;


        if ((currentVerse === word.verseKey)) {
            audioActions.setCurrentWord(word.code);
        } else {
            audioActions.pause();
            audioActions.setAyah(word.verseKey);
            audioActions.playCurrentWord({ word });
        }
    }

    render() {
        const { word, currentVerse, useTextFont } = this.props;

        let text;
        let spacer;
        const highlight = 'highlight';
        const className = `${useTextFont ? 'text-' : ''}${word.className} ${word.charType} ${highlight} ${word.highlight ? word.highlight : ''}`;

        if (useTextFont) {
            if (word.charType === CHAR_TYPE_END) {
                text = zeroPad(word.verseKey.split(':')[1], 3, 0);
            } else {
                text = word.textMadani;
            }
        } else {
            text = word.code;
        }

        if (word.charType === CHAR_TYPE_WORD) {
            spacer = '&nbsp;';
        }
debugger
        return (

            <>
                <div className='page'>
                    <div className='word'>&#xfb51;&#xfb52;&#xfb53;&#xfb54;&#xfb55;</div>

                    <div className='word'>&#xfb56;&#xfb57;&#xfb58;&#xfb59;&#xfb5a;</div>

                    <div className='word'>&#xfb5b;&#xfb5c;&#xfb5d;&#xfb5e;&#xfb5f;&#xfb60;&#xfb61;</div>

                    <div className='word'>&#xfb62;&#xfb63;&#xfb64;&#xfb65;&#xfb66;&#xfb67;</div>

                    <div className='word'>&#xfb68;&#xfb69;&#xfb6a;&#xfb6b;&#xfb6c;&#xfb6d;</div>

                    <div className='word'>&#xfb6e;&#xfb6f;&#xfb70;&#xfb71;</div>

                    <div className='word'>&#xfb72;&#xfb73;&#xfb74;</div>
                </ div>
                <div className='page'>
                    <span>
                    <p className='word' 
                    
                    key={word.code}

                    dangerouslySetInnerHTML={{ __html:  word.code }}
                    >
                      

                    </p>

                    </span>
              

                    <span>
                            <b style={{ color: 'white' }}// eslint-disable-line

                                dangerouslySetInnerHTML={{ __html: word.code }}
                            />
                        <small dangerouslySetInnerHTML={{ __html: spacer }} style={{ letterSpacing: -15 }} />
                    </span>
                </div>
            </>

            //   <span  style={{fontFamily:"p1"}}>
            //     <b // eslint-disable-line
            // style={{fontFamily:"p1"}}
            //       key={word.code}
            //       id={1}
            //       onDoubleClick={this.handleSegmentPlay}
            //       onClick={this.handleWordPlay}
            //       className={`p1 pointer`}
            //       dangerouslySetInnerHTML={{ __html: text }}
            //     />
            //     <small dangerouslySetInnerHTML={{ __html: spacer }} style={{ letterSpacing: -15 }} />
            //   </span>
        );
    }
}

Word.propTypes = {
    word: false, // eslint-disable-line
    audioActions: false, // eslint-disable-line
    currentVerse: "",
    useTextFont: true // tmp change to compare text and code based rendering
};

export default Word;
