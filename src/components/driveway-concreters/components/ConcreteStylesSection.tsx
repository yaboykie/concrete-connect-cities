
import React from 'react';

const ConcreteStylesSection = () => {
  const styles = [
    {
      title: 'Exposed Aggregate',
      description: 'Pebble-stone texture, stylish and slip-resistant'
    },
    {
      title: 'Stamped Concrete',
      description: 'Mimics brick, stone, or pavers'
    },
    {
      title: 'Brushed Finish',
      description: 'Classic texture with grip'
    },
    {
      title: 'Coloured Concrete',
      description: 'Match your home with custom colors'
    },
    {
      title: 'Polished Concrete',
      description: 'Sleek, modern, designer finish'
    },
    {
      title: 'Pave Cut Concrete',
      description: 'Clean lines, mimics tiles or pavers'
    }
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-6">Popular Concrete Driveway Styles Homeowners Love</h2>
          <p className="text-lg text-center text-gray-700 mb-10">
            Your driveway doesn't have to be plain grey. With so many finishes and styles to choose from, 
            you can get a custom look that complements your home perfectly — while still being durable, 
            low-maintenance, and built to last.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {styles.map((style, index) => (
              <div key={index} className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">{style.title}</h3>
                <p className="text-gray-700">{style.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConcreteStylesSection;
