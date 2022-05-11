import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";
import moment from "moment";

import { thaiNumber } from '../../utillities/anotherFunctions'


const styles = StyleSheet.create({
    page: {
        fontFamily: 'THSarabunNew',
        backgroundColor: "#ffffff",
        padding: '2cm'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    movieContainer: {
        backgroundColor: "#f6f6f5",
        display: "flex",
        flexDirection: "row",
        padding: 5
    },
    movieDetails: {
        display: "flex",
        marginLeft: 5
    },
    movieTitle: {
        fontSize: 15,
        marginBottom: 10
    },
    movieOverview: {
        fontSize: 10
    },

    image: {
        height: 200,
        width: 150
    },
    subtitle: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        width: 150,
        alignItems: "center",
        marginBottom: 12
    },
    vote: {
        display: "flex",
        flexDirection: "row"
    },
    rating: {
        height: 10,
        width: 10
    },
    vote_text: {
        fontSize: 10
    },
    vote_pop: {
        fontSize: 10,
        padding: 2,
        backgroundColor: "#61C74F",
        color: "#fff"
    },
    vote_pop_text: {
        fontSize: 10,
        marginLeft: 4
    },
    overviewContainer: {
        minHeight: 110
    },
    detailsFooter: {
        display: "flex",
        flexDirection: "row"
    },
    lang: {
        fontSize: 8,
        fontWeight: 700
    },
    vote_average: {
        fontSize: 8,
        marginLeft: 4,
        fontWeight: "bold"
    }
});

export const PdfDocument = (props) => {
    // console.log("pdf props", props.data);
    return (
        <Document>
            <Page style={styles.page} size="A4">
                {props.data
                    ? props.data.map((a, index) => {
                            return (
                                <View key={index} style={styles.movieContainer}>
                                    <Image
                                        style={styles.image}
                                        source={"150.jpg"}
                                    />
                                    <View style={styles.movieDetails}>
                                        <Text style={styles.movieTitle}>ชื่อภาพยนต์</Text>
                                        <View style={styles.subtitle}>
                                            <View style={styles.vote}>
                                                <Image source="star.png" style={styles.rating} />
                                                <Text style={styles.vote_text}>{ thaiNumber(55) }</Text>
                                            </View>
                                            <View style={styles.vote}>
                                                <Text style={styles.vote_pop}>โหวด</Text>
                                                <Text style={styles.vote_pop_text}>Popularity</Text>
                                            </View>
                                        </View>
                                        <View style={styles.overviewContainer}>
                                            <Text style={styles.movieOverview}>โอเวอร์วิว</Text>
                                        </View>
                                        <View style={styles.detailsFooter}>
                                            <Text style={styles.lang}>
                                                Language: ภาษา
                                            </Text>
                                            <Text style={styles.vote_average}>
                                                Average Votes: ค่าเฉลี่ย
                                            </Text>
                                            <Text style={styles.vote_average}>
                                                Release Date:{" "}
                                                {moment('2015-10-25', "YYYY-MM-DD").format(
                                                    " MMMM D Y"
                                                )}
                                            </Text>
                                        </View>
                    </View>
                    </View>
                );
                })
            : ""}
            </Page>

            <Page style={styles.page} size="A4">
                {props.data
                    ? props.data.map((a, index) => {
                            return (
                                <View key={index} style={styles.movieContainer}>
                                    <Image
                                        style={styles.image}
                                        source={"150.jpg"}
                                    />
                                    <View style={styles.movieDetails}>
                                        <Text style={styles.movieTitle}>ชื่อภาพยนต์</Text>
                                        <View style={styles.subtitle}>
                                            <View style={styles.vote}>
                                                <Image source="star.png" style={styles.rating} />
                                                <Text style={styles.vote_text}>{ thaiNumber(55) }</Text>
                                            </View>
                                            <View style={styles.vote}>
                                                <Text style={styles.vote_pop}>โหวด</Text>
                                                <Text style={styles.vote_pop_text}>Popularity</Text>
                                            </View>
                                        </View>
                                        <View style={styles.overviewContainer}>
                                            <Text style={styles.movieOverview}>โอเวอร์วิว</Text>
                                        </View>
                                        <View style={styles.detailsFooter}>
                                            <Text style={styles.lang}>
                                                Language: ภาษา
                                            </Text>
                                            <Text style={styles.vote_average}>
                                                Average Votes: ค่าเฉลี่ย
                                            </Text>
                                            <Text style={styles.vote_average}>
                                                Release Date:{" "}
                                                {moment('2015-10-25', "YYYY-MM-DD").format(
                                                    " MMMM D Y"
                                                )}
                                            </Text>
                                        </View>
                    </View>
                    </View>
                );
                })
            : ""}
            </Page>
            <Page style={styles.page} size="A4">
                {props.data
                    ? props.data.map((a, index) => {
                            return (
                                <View key={index} style={styles.movieContainer}>
                                    <Image
                                        style={styles.image}
                                        source={"150.jpg"}
                                    />
                                    <View style={styles.movieDetails}>
                                        <Text style={styles.movieTitle}>ชื่อภาพยนต์</Text>
                                        <View style={styles.subtitle}>
                                            <View style={styles.vote}>
                                                <Image source="star.png" style={styles.rating} />
                                                <Text style={styles.vote_text}>{ thaiNumber(55) }</Text>
                                            </View>
                                            <View style={styles.vote}>
                                                <Text style={styles.vote_pop}>โหวด</Text>
                                                <Text style={styles.vote_pop_text}>Popularity</Text>
                                            </View>
                                        </View>
                                        <View style={styles.overviewContainer}>
                                            <Text style={styles.movieOverview}>โอเวอร์วิว</Text>
                                        </View>
                                        <View style={styles.detailsFooter}>
                                            <Text style={styles.lang}>
                                                Language: ภาษา
                                            </Text>
                                            <Text style={styles.vote_average}>
                                                Average Votes: ค่าเฉลี่ย
                                            </Text>
                                            <Text style={styles.vote_average}>
                                                Release Date:{" "}
                                                {moment('2015-10-25', "YYYY-MM-DD").format(
                                                    " MMMM D Y"
                                                )}
                                            </Text>
                                        </View>
                    </View>
                    </View>
                );
                })
            : ""}
            </Page>
            
            <Page style={styles.page} size="A4">
                {props.data
                    ? props.data.map((a, index) => {
                            return (
                                <View key={index} style={styles.movieContainer}>
                                    <Image
                                        style={styles.image}
                                        source={"150.jpg"}
                                    />
                                    <View style={styles.movieDetails}>
                                        <Text style={styles.movieTitle}>ชื่อภาพยนต์</Text>
                                        <View style={styles.subtitle}>
                                            <View style={styles.vote}>
                                                <Image source="star.png" style={styles.rating} />
                                                <Text style={styles.vote_text}>{ thaiNumber(55) }</Text>
                                            </View>
                                            <View style={styles.vote}>
                                                <Text style={styles.vote_pop}>โหวด</Text>
                                                <Text style={styles.vote_pop_text}>Popularity</Text>
                                            </View>
                                        </View>
                                        <View style={styles.overviewContainer}>
                                            <Text style={styles.movieOverview}>โอเวอร์วิว</Text>
                                        </View>
                                        <View style={styles.detailsFooter}>
                                            <Text style={styles.lang}>
                                                Language: ภาษา
                                            </Text>
                                            <Text style={styles.vote_average}>
                                                Average Votes: ค่าเฉลี่ย
                                            </Text>
                                            <Text style={styles.vote_average}>
                                                Release Date:{" "}
                                                {moment('2015-10-25', "YYYY-MM-DD").format(
                                                    " MMMM D Y"
                                                )}
                                            </Text>
                                        </View>
                    </View>
                    </View>
                );
                })
            : ""}
            </Page>
            <Page style={styles.page} size="A4">
                {props.data
                    ? props.data.map((a, index) => {
                            return (
                                <View key={index} style={styles.movieContainer}>
                                    <Image
                                        style={styles.image}
                                        source={"150.jpg"}
                                    />
                                    <View style={styles.movieDetails}>
                                        <Text style={styles.movieTitle}>ชื่อภาพยนต์</Text>
                                        <View style={styles.subtitle}>
                                            <View style={styles.vote}>
                                                <Image source="star.png" style={styles.rating} />
                                                <Text style={styles.vote_text}>{ thaiNumber(55) }</Text>
                                            </View>
                                            <View style={styles.vote}>
                                                <Text style={styles.vote_pop}>โหวด</Text>
                                                <Text style={styles.vote_pop_text}>Popularity</Text>
                                            </View>
                                        </View>
                                        <View style={styles.overviewContainer}>
                                            <Text style={styles.movieOverview}>โอเวอร์วิว</Text>
                                        </View>
                                        <View style={styles.detailsFooter}>
                                            <Text style={styles.lang}>
                                                Language: ภาษา
                                            </Text>
                                            <Text style={styles.vote_average}>
                                                Average Votes: ค่าเฉลี่ย
                                            </Text>
                                            <Text style={styles.vote_average}>
                                                Release Date:{" "}
                                                {moment('2015-10-25', "YYYY-MM-DD").format(
                                                    " MMMM D Y"
                                                )}
                                            </Text>
                                        </View>
                    </View>
                    </View>
                );
                })
            : ""}
            </Page>
            <Page style={styles.page} size="A4">
                {props.data
                    ? props.data.map((a, index) => {
                            return (
                                <View key={index} style={styles.movieContainer}>
                                    <Image
                                        style={styles.image}
                                        source={"150.jpg"}
                                    />
                                    <View style={styles.movieDetails}>
                                        <Text style={styles.movieTitle}>ชื่อภาพยนต์</Text>
                                        <View style={styles.subtitle}>
                                            <View style={styles.vote}>
                                                <Image source="star.png" style={styles.rating} />
                                                <Text style={styles.vote_text}>{ thaiNumber(55) }</Text>
                                            </View>
                                            <View style={styles.vote}>
                                                <Text style={styles.vote_pop}>โหวด</Text>
                                                <Text style={styles.vote_pop_text}>Popularity</Text>
                                            </View>
                                        </View>
                                        <View style={styles.overviewContainer}>
                                            <Text style={styles.movieOverview}>โอเวอร์วิว</Text>
                                        </View>
                                        <View style={styles.detailsFooter}>
                                            <Text style={styles.lang}>
                                                Language: ภาษา
                                            </Text>
                                            <Text style={styles.vote_average}>
                                                Average Votes: ค่าเฉลี่ย
                                            </Text>
                                            <Text style={styles.vote_average}>
                                                Release Date:{" "}
                                                {moment('2015-10-25', "YYYY-MM-DD").format(
                                                    " MMMM D Y"
                                                )}
                                            </Text>
                                        </View>
                    </View>
                    </View>
                );
                })
            : ""}
            </Page>
        </Document>
    );
}