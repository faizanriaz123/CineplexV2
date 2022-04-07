import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState, useContext } from "react";
import {AuthContext} from '../context/auth'
import {Grid, Label, Button, Header, Divider} from 'semantic-ui-react'

function ManageBookings(){
    const context = useContext(AuthContext);
    const { loading, error, data} = useQuery(GET_SEATING, {
        variables: {userId: context.user.id}
    })

    const  [refund] = useMutation(DELETE_TICKET);
    const [unreserve] = useMutation(DELETE_TIMESLOT);
    
    if (loading) return 'Loading...';

    if (error) return (
        <Header textAlign="center" size="huge">
            {console.log(context.user.id)}
            {console.log(JSON.stringify(error, null, 2))}
            No Bookings Found
        </Header>
    )
    
    return(
        <div>
            <Header textAlign="center" size="huge">
                Your Bookings
            </Header>
            <Divider horizontal>
                *
            </Divider>
            <Grid relaxed container={true} divided={"vertically"}>
                {data.ticketHistory.map(ticket => (
                    <Grid.Row columns={6} >
                        <Grid.Column>
                            <Label color="blue">
                                {ticket.movieTitle}
                            </Label>
                        </Grid.Column>
                        <Grid.Column>
                            <Label color="red">
                                {ticket.date}
                            </Label>
                        </Grid.Column>
                        <Grid.Column>
                            <Label color="red">
                                {ticket.timeSlot}
                            </Label>
                        </Grid.Column>
                        <Grid.Column>
                            <Label color="green">
                                {ticket.seatRow}
                            </Label>
                        </Grid.Column>
                        <Grid.Column>
                            <Label color="green">
                                {ticket.seatNumber}
                            </Label>
                        </Grid.Column>
                        <Grid.Column>
                            <Button color="instagram" onClick={async () => {
                                console.log([{seatRow: ticket.seatRow,seatNumber: ticket.seatNumber, id: ticket.seatRow + ticket.seatNumber}])
                                let variables = {movieId: ticket.movieId, date: ticket.date, timeslot: ticket.timeSlot, seats: [{seatRow: ticket.seatRow,seatNumber: ticket.seatNumber, id: ticket.seatRow.toLowerCase() + ticket.seatNumber}]}
                                await unreserve({variables: variables}); 
                                await refund({variables: {ticketId: ticket.id}});
                                window.location.reload();                                
                                }}>
                                Refund Ticket
                            </Button>
                        </Grid.Column> 
                    </Grid.Row>  
                ))}
            </Grid>
        </div>
    )
}

const GET_SEATING = gql`
    query ticketHistory(
        $userId: ID!
    ) {
       ticketHistory(
           userId: $userId
       ){
            id
            userId
            movieId
            movieTitle
            date
            timeSlot
            seatRow
            seatNumber
       }
    }
`

const DELETE_TICKET = gql`
    mutation refundTicket(
        $ticketId: ID!
    ) {
        refundTicket(
            ticketId: $ticketId
        ){
            id
        }
    }
`

const DELETE_TIMESLOT = gql`
    mutation unreserveSeats(
        $seats: [reservationElement!]!
        $movieId: String!
        $date: String!
        $timeslot: String!
    ) {
        unreserveSeats(
            seatReservations:{
                seats: $seats
                movieId: $movieId
                date: $date
                timeSlot: $timeslot
            }
        ){
            availableSeats
        }
    }
`

export default ManageBookings;