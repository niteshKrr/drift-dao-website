import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Input, Textarea, Button, FormElement } from '@nextui-org/react';

const initialValues = {
	name: '',
	email: '',
	message: '',
};

const ContactForm = () => {
	const [formdata, setformdata] = useState(initialValues);

	const handleInputChange = (event: React.ChangeEvent<FormElement>) => {
		const { name, value } = event.target;
		setformdata({
			...formdata,
			[name]: value,
		});
	};

	// Validate if a string an email
	function validateEmail(email: string) {
		var re = /\S+@\S+\.\S+/;
		return re.test(email);
	}

	const formSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
		// event.preventDefault();
		const { name, email, message } = formdata;
		let msg = '';

		if (name === '') {
			msg = 'Please enter your name.';
		} else if (email === '') {
			msg = 'Please enter your email.';
		} else if (message === '') {
			msg = 'Please enter your message.';
		} else if (validateEmail(email) === false) {
			msg = 'Please enter a valid email address';
		}

		if (msg) {
			swal({
				title: 'Error!',
				text: msg,
				icon: 'error',
				buttons: {
					cancel: {
						text: 'Close',
						value: true,
						visible: true,
						className: '',
						closeModal: true,
					},
				},
			});
		} else {
			swal({
				title: 'Thank you!',
				text: 'Thank you, we will soon reach out to you.',
				icon: 'success',
			});
			// sendMailToUs(name, email, message);
			setformdata(initialValues);
			const result = await axios({
				method: 'post',
				url: 'https://www.backend.drift-dao.com/contactForm',
				data: {
					name,
					email,
					message,
				},
			});
			// console.log(result);
		}
	};

	return (
		<div className="max-w-2xl">
			<div className="flex flex-col gap-4">
				<div>
					<div className="mb-2 block">
						<label htmlFor="name" className="text-lg">
							Your name
						</label>
						<br />
						<Input
							width="80%"
							id="name"
							placeholder="Vitalik Buterin"
							type="text"
							value={formdata.name}
							onChange={handleInputChange}
							name="name"
							aria-labelledby="name"
						/>
					</div>
				</div>
				<div>
					<div className="mb-2 block">
						<label htmlFor="email" className="text-lg">
							Your email
						</label>
						<br />
						<Input
							id="email"
							width="80%"
							value={formdata.email}
							onChange={handleInputChange}
							name="email"
							placeholder="drift.dao@gmail.com"
							aria-labelledby="alpha"
						/>
					</div>
				</div>

				<div className="mb-2 block">
					<label htmlFor="message" className="text-lg ">
						Message
					</label>
					<br />
					<Textarea
						id="message"
						width="80%"
						aria-labelledby="message"
						value={formdata.message}
						onChange={handleInputChange}
						name="message"
						placeholder="Leave a message..."
						rows={4}
					/>
				</div>
				<div>
					<Button
						shadow
						color="success"
						onClick={formSubmit}
						size="lg"
						style={{ width: '80%' }}
					>
						Submit
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ContactForm;
