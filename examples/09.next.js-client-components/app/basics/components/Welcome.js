export default function Welcome({ appName, children }) {
  return (
    <>
      <h1>Welcome to {appName}</h1>
      {children}
      <br />
    </>
  );
}
