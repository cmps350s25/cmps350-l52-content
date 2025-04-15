"use client";
import { useState, useEffect } from "react";

export default function SurahSelector({ surahs }) {
  const [ayat, setAyat] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(1);

  //Gets auto-executed every time selectedSurah changes
  useEffect(() => {
    async function getVerses(surahId) {
      if (surahId == 0) return [];
      const url = `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${surahId}`;
      const response = await fetch(url);
      const verses = await response.json();
      return verses.verses;
    }

    console.log(`selectedSurah is now ${selectedSurah}`);
    getVerses(selectedSurah).then((verses) => setAyat(verses));
  }, [selectedSurah]);

  return (
    <>
      <label htmlFor="surahDD">Surah</label>
      <SurahDD surahs={surahs} setSelectedSurah={setSelectedSurah} />
      <br />
      <AyaList ayat={ayat} />
    </>
  );
}

function SurahDD({ surahs, setSelectedSurah }) {
  return (
    <select onChange={(e) => setSelectedSurah(e.target.value)}>
      {surahs.map((surah, i) => (
        <option value={surah.id} key={i}>
          {surah.name_arabic} - {surah.name_simple}
        </option>
      ))}
    </select>
  );
}

function AyaList({ ayat }) {
  return (
    <ul style={{ direction: "rtl" }}>
      {ayat.map((aya, i) => (
        <Aya aya={aya} key={i} />
      ))}
    </ul>
  );
}

function Aya({ aya }) {
  return (
    <li>
      <span>{aya.verse_key.split(":")[1]}. </span>
      <span>{aya.text_uthmani}</span>
    </li>
  );
}
