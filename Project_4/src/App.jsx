import { useCallback, useEffect, useRef, useState } from "react";

function App() {
	// State based variable
	const [length, setLength] = useState(8);
	const [allowNumber, setAllowNumber] = useState(true);
	const [allowSpecialChar, setAllowSpecialChar] = useState(false);
	const [password, setPassword] = useState("");

	// *Ref based variable
	const passwordRef = useRef(null);
	const tooltipRef = useRef(null);
	let copiedPasswordRef = useRef("");

	// *Function to generate password
	const passwordGenerator = useCallback(() => {
		let password = "";
		let string = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm";
		if (allowNumber) string += "0123456789";
		if (allowSpecialChar) string += "!@#$%^&*_-+=|\\/?><~`";
		for (let i = 0; i < length; i++) {
			let char = Math.floor(Math.random() * string.length);
			password += string.charAt(char);
		}
		setPassword(password);
		tooltipRef.current.classList.add("hidden");
	}, [length, allowNumber, allowSpecialChar]);

	// *Dependencies to generate new password
	useEffect(() => {
		passwordGenerator();
		tooltipRef.current.classList.add("hidden");
	}, [length, allowNumber, allowSpecialChar, passwordGenerator]);

	// *Function to cope=y generated password on clipboard
	const copyPassword = useCallback(() => {
		passwordRef.current?.select();
		tooltipRef.current.classList.remove("hidden");
		copiedPasswordRef.current.innerHTML = `Previously Copied Password : ${password}`;
		window.navigator.clipboard.writeText(password);
	}, [password]);

	// ! JSX
	return (
		<>
			{/* HEADING */}
			<h1 className="text-4xl text-center text-white my-10 font-medium">
				Password Generator
			</h1>

			<div className="w-3/4 md:w-1/2 lg:w-3/5 mx-auto">
				{/* PASSWORD AND COPY BUTTON */}
				<div className="flex relative">
					<input
						type="text"
						value={password}
						className="outline-none w-full px-5 py-2 rounded-lg"
						placeholder="password"
						ref={passwordRef}
						readOnly
					/>
					<button
						className="bg-blue-400 py-4 px-6 ms-3 rounded-lg"
						onClick={copyPassword}
					>
						Copy
					</button>
					<div
						ref={tooltipRef}
						value="none"
						className="absolute top-0 left-0 px-3 py-1 text-white bg-gray-500 rounded-lg shadow-lg -translate-y-full hidden"
					>
						Copied!
					</div>
				</div>

				{/* OPTIONS TO GENERATE PASSWORD */}
				<div className=" flex flex-col lg:flex-row lg:gap-10 my-10 text-white">
					<div className="flex align-center">
						<input
							title={length}
							type="range"
							name="passwordLength"
							id="passwordRange"
							className="cursor-pointer me-2"
							min={4}
							max={20}
							value={length}
							onChange={(e) => setLength(e.target.value)}
						/>
						<label htmlFor="passwordRange">Length {length} </label>
					</div>
					<div className="flex items-center my-3 lg:m-0">
						<input
							type="checkbox"
							name="number"
							id="numberCheck"
							className="me-2"
							onChange={() => setAllowNumber((prev) => !prev)}
							checked={allowNumber}
						/>
						<label htmlFor="numberCheck">Numbers</label>
					</div>
					<div className="flex items-center">
						<input
							type="checkbox"
							name="specialChar"
							id="charCheck"
							className="me-2"
							onChange={() => setAllowSpecialChar((prev) => !prev)}
							checked={allowSpecialChar}
						/>
						<label htmlFor="charCheck">Special Characters</label>
					</div>
				</div>

				{/* BUTTON TO GENERATE PASSWORD AND COPIED PASSWORD SHOWING FIELD */}
				<div className="flex flex-col lg:flex-row text-white lg:items-center">
					<button
						className="bg-blue-400 py-2 px-6 me-5 rounded-lg"
						onClick={passwordGenerator}
					>
						Generate New Password
					</button>
					<span ref={copiedPasswordRef} className="mt-5 lg:m-0">
						Previously Copied Password :
					</span>
				</div>
			</div>
		</>
	);
}

export default App;
