import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  FiMapPin,
  FiCalendar,
  FiArrowRight,
  FiInbox,
} from "react-icons/fi";

export const BOOKING_CREATED_EVENT = "luxedrive:booking-created";

export default function YourBookings({ user }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = useCallback(() => {
    if (!user?.username) return;

    setLoading(true);
    axios
      .get(
        `http://localhost:8000/getBookings.php?username=${encodeURIComponent(
          user.username
        )}`
      )
      .then((res) => {
        if (res.data.success) {
          setBookings(res.data.bookings);
          setError("");
        } else {
          setError(res.data.message || "Failed to load bookings.");
        }
      })
      .catch(() => setError("Network error while loading bookings."))
      .finally(() => setLoading(false));
  }, [user]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  useEffect(() => {
    const handler = () => fetchBookings();
    window.addEventListener(BOOKING_CREATED_EVENT, handler);
    return () => window.removeEventListener(BOOKING_CREATED_EVENT, handler);
  }, [fetchBookings]);

  if (!user?.username) return null;

  const scrollToCars = () => {
    const el = document.getElementById("cars-for-rent");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section id="your-bookings">
      <Container>
        <Title>Your Bookings</Title>
        <Subtitle>
          {bookings.length > 0
            ? `A quick look at your reservations, ${user.username}.`
            : "Reserve a vehicle to see it here."}
        </Subtitle>

        {loading && <Muted>Loading your bookings…</Muted>}

        {!loading && error && <ErrorBanner>{error}</ErrorBanner>}

        {!loading && !error && bookings.length === 0 && (
          <Panel>
            <EmptyState>
              <EmptyIcon>
                <FiInbox />
              </EmptyIcon>
              <EmptyTitle>No bookings yet</EmptyTitle>
              <EmptyText>Your future rentals will appear right here.</EmptyText>
              <CTAButton onClick={scrollToCars}>
                Browse Cars <FiArrowRight />
              </CTAButton>
            </EmptyState>
          </Panel>
        )}

        {!loading && !error && bookings.length > 0 && (
          <List>
            {bookings.map((b) => (
              <BookingCard key={b.id}>
                {b.car_info && <CarLabel>{b.car_info}</CarLabel>}

                <Row>
                  <Segment>
                    <SegmentLabel>
                      <FiCalendar /> Pick-up
                    </SegmentLabel>
                    <SegmentValue>{b.pickup_date}</SegmentValue>
                    {!b.car_info && (
                      <SegmentMeta>
                        <FiMapPin /> {b.pickup_location}
                      </SegmentMeta>
                    )}
                  </Segment>

                  <Divider />

                  <Segment>
                    <SegmentLabel>
                      <FiCalendar /> Drop-off
                    </SegmentLabel>
                    <SegmentValue>{b.dropoff_date || "—"}</SegmentValue>
                    {!b.car_info && (
                      <SegmentMeta>
                        <FiMapPin /> {b.dropoff_location || "—"}
                      </SegmentMeta>
                    )}
                  </Segment>
                </Row>

                <Footer>
                  <BookingId>Booking #{b.id}</BookingId>
                  <BookingDate>{b.created_at}</BookingDate>
                </Footer>
              </BookingCard>
            ))}
          </List>
        )}
      </Container>
    </Section>
  );
}

/* ===================== STYLED COMPONENTS ===================== */

const Section = styled.section`
  background: #fff;
  padding: 80px 20px;
  display: flex;
  justify-content: center;
  color: #000;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 16px;
`;

const Subtitle = styled.p`
  color: #666;
  max-width: 650px;
  margin: 0 auto 60px;
  line-height: 1.6;
`;

const Muted = styled.p`
  color: #666;
  font-size: 14px;
`;

const ErrorBanner = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 12px 16px;
  background: rgba(211, 47, 47, 0.08);
  border-left: 3px solid #d32f2f;
  color: #d32f2f;
  border-radius: 8px;
  font-size: 14px;
`;

const Panel = styled.div`
  background: #f9f9f9;
  border-radius: 20px;
  padding: 60px 40px;

  @media (max-width: 900px) {
    padding: 40px 20px;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const EmptyIcon = styled.div`
  width: 64px;
  height: 64px;
  margin-bottom: 18px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  color: #333;
`;

const EmptyTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 1.3rem;
  color: #000;
`;

const EmptyText = styled.p`
  margin: 0 0 24px;
  color: #666;
  font-size: 0.95rem;
`;

const CTAButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  background: #000;
  color: #fff;
  font-weight: 600;
  border: 1px solid #000;
  border-radius: 40px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: 0.25s;

  &:hover {
    background: transparent;
    color: #000;
  }
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  text-align: left;
`;

const BookingCard = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 22px 26px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  transition: transform 0.25s, box-shadow 0.25s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
`;

const CarLabel = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #000;
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
`;

const Row = styled.div`
  display: flex;
  align-items: stretch;
  gap: 20px;

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 14px;
  }
`;

const Segment = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SegmentLabel = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #999;
`;

const SegmentValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #000;
`;

const SegmentMeta = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #666;
`;

const Divider = styled.div`
  width: 1px;
  background: #eee;

  @media (max-width: 500px) {
    display: none;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #eee;
  font-size: 12px;
  color: #999;
`;

const BookingId = styled.span`
  font-weight: 600;
  color: #555;
`;

const BookingDate = styled.span`
  opacity: 0.8;
`;
