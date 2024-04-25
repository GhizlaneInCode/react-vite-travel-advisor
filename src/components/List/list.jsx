import { useState, useEffect, createRef } from 'react';
import PlaceDetails from '../PlaceDetails/placeDetails.jsx';
import styles from './styles.module.css';
import { Select, Typography, Col, Row, Spin } from 'antd';
const { Text } = Typography;


const List = ({ places, type, setType, rating, setRating, childClicked, isLoading }) => {
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        setElRefs((refs) => Array(places.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);

    return (
        <div className={styles.container}>
            <Text strong >Food & Dining around you</Text>
            {isLoading ? (
                <div className={styles.loading}>
                    <Spin tip="Loading">
                        <div className={styles.loadingaa} />
                    </Spin>
                </div>
            ) : (
                <>
                    <div className={styles.selectContainer}>
                        <Select
                            id="type" value={type} onChange={(value) => setType(value)}
                            defaultValue="restaurants"
                            style={{
                                width: 150,
                            }}
                            options={[
                                {
                                    value: 'restaurants',
                                    label: 'Restaurants',
                                },
                                {
                                    value: 'hotels',
                                    label: 'Hotels',
                                },
                            ]}
                        />

                        <Select
                            id="rating" value={rating}
                            defaultValue=""
                            style={{
                                width: 150,
                            }}
                            onChange={(value) => setRating(value)}
                            options={[
                                {
                                    value: '',
                                    label: 'All',
                                },
                                {
                                    value: '3',
                                    label: 'Above 3.0',
                                },
                                {
                                    value: '4',
                                    label: 'Above 4.0',
                                },
                                {
                                    value: '4.5',
                                    label: 'Above 4.5',
                                }
                            ]}
                        />
                    </div>

                    {places?.map((place, i) => (
                        <Row key={i}>
                            <Col span={12} ref={elRefs[i]} >
                                <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
                            </Col>
                        </Row>

                    ))}
                </>
            )}
        </div>
    );
};

export default List;
