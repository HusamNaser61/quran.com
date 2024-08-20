import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Verse from "./Verse"
//import Verse from 'husam_naser4/src/Verse';
function App() {
  const [pages, setPages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [verses, setVerses] = useState([]);

  useEffect(() => {
    const fetchVerses = async (page) => {
      try {
        const response = await axios.get(
          // `https://api.quran.com/api/v4/verses/by_page/${page}?words=true&fields=text_uthmani&word_fields=text_uthmani,code_v2`,
          "https://api.quran.com/api/v3/chapters/1/verses"
        );
        console.log(response);
        
        const x = pages;
        const lines = {};
        const  verses = response.data.verses;
        setVerses(verses)
        for (let i = 0; i < verses.length; i += 1) {
          verses[i].words.map((word) => {
            const textUthmani = word.code;
            const lineNumber = word.line_number;
            if (lines[lineNumber]) lines[lineNumber].push(textUthmani);
            else (lines[lineNumber] = [textUthmani]);
            return true;
          });
        }
        x[page] = lines;
        console.log(x);
        setPages(x);
      } catch (error) {
        console.error('Error fetching verses:', error);
      }
    };

    if (pages[currentPage] == null) fetchVerses(currentPage);
  }, [currentPage]);
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

    {Object.values(verses).map(verse => (
      <Verse
        verse={verse}
        chapter={1}
        currentVerse={1}
        iscurrentVerse={false && verse.verseKey === 1}
        key={`${verse.chapterId}-${verse.id}-verse`}

      />
    ))}
    </>


    // pages[currentPage] != null && (
    //     <div>
    //       {Object.values(pages[currentPage]).map((line) => (
    //         <div style={styles.line}>
    //           {line.map((word) => <div style={styles.word}>{word}</div>)}
    //         </div>
    //       ))}
    //     </div>
    // )
  );
  // return (

  //   <div className="App">
  //     <div className="word">  بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ١ </div>

  //     <div className="word">ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ ٢</div>
  //     <div className="word">ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ ٣ مَـٰلِكِ يَوْمِ ٱلدِّينِ ٤</div>
  //     <div className="word"> إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ ٥ ٱهْدِنَا</div>
  //     <div className="word">   ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ ٦ صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ</div>
  //     <div className="word">    عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ</div>
  //     <div className="word">     وَلَا ٱلضَّآلِّينَ ٧      </div>
  //     <br></br>
  //     <br></br>
  //     <br></br>
  //     <span className='word'>&#xfb51; &#xfb52; &#xfb53; &#xfb54; &#xfb55;</span>
  //     <span className='word'>&#xfb52;</span>
  //   </div>
  // );
}

export default App;