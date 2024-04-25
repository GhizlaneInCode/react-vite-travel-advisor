import {useState} from 'react';
import { EnvironmentTwoTone, PhoneTwoTone, LinkOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Card, Typography, Rate, Space, Tag } from 'antd';
const { Meta } = Card;
const { Title, Text } = Typography;

import styles from './styles.module.css';


const PlaceDetails = ({ place, selected, refProp }) => {
    if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  


    return (

        <Card
            className={styles.card}
            style={{
                width: 300,
            }}

            cover={
                <img className={styles.imageCover}
                    alt="restaurantImage"
                    src={place.photos && place.photos.length > 0 ? place.photos[0].src : ""}
                    onError={(e) => {
                        e.target.src = './restaurant.jpg';
                    }}
                />
            
            }
            actions={[
                place.place_link && (
                    <Text className={styles.iconHover} type='secondary' onClick={() => window.open(place.place_link, '_blank')}><EnvironmentOutlined key="environment" /> Location</Text>
                ),
            
        
                place.website && (
                    <Text className={styles.iconHover} type='secondary' onClick={() => window.open(place.website, '_blank')}><LinkOutlined key="link" /> Website</Text>
                )

            ].filter(Boolean)}
        >
            <Meta
                title={place.name}
            />
            <div className={styles.cardContent}>

                <Text type="secondary">{place.state}</Text>


                <div className={styles.spaceBetweenContent}>
                    <Rate disabled allowHalf defaultValue={1} value={Number(place.rating)} style={{ marginBlock: 20, fontSize: '15px' }} />
                    <Text strong>{place.review_count} review{place.review_count > 1 && 's'}</Text>
                </div>


                <div className={styles.spaceBetweenContent}>
                    <Text strong>Price</Text>
                    <Text strong>{place.price_level ? place.price_level + ",$$" : "$$"}</Text>
                </div>


                {place?.awards?.map((award) => (
                    <div className={styles.spaceBetweenContent}>
                        <img src={award.images.small} />
                        <Text>{award.display_name}</Text>
                    </div>
                ))}


                <div className="chipContainer">
                    {place?.types?.map((name) => (
                        <Tag key={name} color="blue" className={styles.chip}>{name}</Tag>
                    ))}
                </div>


                <div className="contactInfo">

                    {place.phone_number && (
                        <Text className={styles.iconText}>
                            <PhoneTwoTone twoToneColor="#eb2f96" rotate={90} />
                            {place.phone_number}</Text>
                    )}

                    {place.full_address && (
                        <Text className={styles.iconText}>
                            <EnvironmentTwoTone twoToneColor="#eb2f96" fontSize="50px" />
                            {place.full_address}</Text>
                    )}
                </div>
            </div>
        </Card>


    );
};

export default PlaceDetails;
