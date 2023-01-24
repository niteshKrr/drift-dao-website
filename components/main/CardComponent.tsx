import React from 'react';
import { Card, Grid, Row, Text } from '@nextui-org/react';
import Image from 'next/image';

type CardComponentProp = {
	name: string;
	email: string;
	twitter: string;
};

const CardComponent = ({ name, email, twitter }: CardComponentProp) => {
	return (
		<div className="max-w-sm m-auto py-6"  style={{ width: '350px', height: '350px' }}>
			<Card isPressable>
				<Card.Body>
					<Image
						src={`/images/team/${twitter}.jpeg`}
						width="350"
						height="350"
						alt="image"
					/>
				</Card.Body>
				<Card.Footer css={{ justifyItems: 'flex-start' }}>
					<Row wrap="wrap" justify="space-between" align="center">
						<div className="font-bold text-2xl tracking-tight text-purple-900">
							{name}
						</div>
						<a href={`mailto: ${email}`}>
							<div className="font-normal text-pink-500 my-1">
								email: {email}
							</div>
						</a>
						<a
							href={`https://twitter.com/${twitter}`}
							target="_blank"
							rel="noreferrer"
						>
							<div className="font-normal text-purple-900 my-1">
								twitter: {twitter}
							</div>
						</a>
					</Row>
				</Card.Footer>
			</Card>
		</div>
	);
};

export default CardComponent;
