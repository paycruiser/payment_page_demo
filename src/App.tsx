import {useEffect, useRef} from "react";
import "./App.css";

interface Iopt {
	invoice_no: string;
	security_code: string;
	merchant_name: string;
	brand_logo: string;
}

function App() {
	// Payment widget ref
	const pay: any = useRef(null);

	useEffect(() => {
		try {
			pay.current = (window as any)?.Paycruiser();
		} catch (err) {
			console.error(err);
		}

		// If payment ref then intialize only once
		if (pay.current) {
			pay.current.init().then(console.log).catch(console.log);
		}
	}, []);

	const paymentHandler = (options?: Iopt) => {
		if (pay.current && options) pay.current.open({...options});
		if (pay.current && !options) pay.current.open();
	};

	return (
		<>
			<section className="container">
				<h4>Test Paycruiser page demo unsing React</h4>
				<button className="btn" onClick={() => paymentHandler()}>
					Pay
				</button>
				<p>
					Get more info{" "}
					<a
						href="https://paycruiser-docs.netlify.app/docs/widgets/payment-widget/"
						target="_blank"
					>
						Here
					</a>
				</p>
			</section>
		</>
	);
}

export default App;
