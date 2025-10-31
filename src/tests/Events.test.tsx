import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Events from '../pages/Events';

describe('Events Page', () => {
  it('should not display a duplicate featured event in the main event grid', () => {
    render(
      <BrowserRouter>
        <Events />
      </BrowserRouter>
    );

    // Check for the featured event
    const featuredEvent = screen.getByTestId('featured-event');
    expect(featuredEvent).toBeInTheDocument();

    // Check that the featured event is not also in the main grid
    const mainGridEvents = screen.getAllByTestId('event-card');
    const featuredEventInGrid = mainGridEvents.find(event => event.dataset.eventId === featuredEvent.dataset.eventId);

    expect(featuredEventInGrid).toBeUndefined();
  });
});
