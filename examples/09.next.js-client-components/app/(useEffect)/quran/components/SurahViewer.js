import SurahSelector from "./SurahSelector";

export default async function SurahViewer() {
  const res = await fetch("https://api.quran.com/api/v4/chapters");
  const data = await res.json();
  const surahs = data.chapters;

  console.log("Surahs count: ", surahs.length);
  return <SurahSelector surahs={surahs} />;
}
