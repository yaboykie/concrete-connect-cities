
import { FAQ } from '../types';

/**
 * Generates location-specific FAQs
 */
export const generateLocationFaqs = (formattedCity: string, formattedState: string): FAQ[] => {
  return [
    {
      question: `How much does a concrete driveway cost in ${formattedCity}?`,
      answer: `Concrete driveway costs in ${formattedCity} typically start from just $4-$6 per square foot for standard installations. For an average driveway, many homeowners invest between $2,500-$5,000 for a complete project. Factors affecting price include size, thickness, and site preparation. Our contractors often offer seasonal discounts and flexible payment options to make your driveway project affordable. Contact us today for a free, no-obligation quote tailored to your specific requirements.`
    },
    {
      question: `How long will a new concrete driveway last in ${formattedState}?`,
      answer: `With proper installation and basic maintenance, concrete driveways in ${formattedState} typically last 30-50 years or more. This exceptional longevity makes concrete one of the most cost-effective driveway options available. Our local contractors understand ${formattedState}'s specific climate challenges and use appropriate concrete mixes and installation techniques to maximize durability, ensuring your investment stands the test of time.`
    },
    {
      question: "What maintenance is required for a concrete driveway?",
      answer: `Concrete driveways require minimal maintenance compared to other materials. Basic care includes occasional cleaning with a pressure washer, sealing every 2-5 years, and addressing small cracks before they expand. Our ${formattedCity} contractors can provide simple maintenance tips specific to your installation that will keep your driveway looking great for decades with minimal expense and effort.`
    },
    {
      question: "How long does it take to install a concrete driveway?",
      answer: `A typical concrete driveway installation takes 3-5 days for removal of the old surface, preparation, pouring, and initial curing. However, you'll need to avoid driving on the new surface for at least 7 days to allow proper curing. Our local ${formattedCity} contractors will provide a specific timeline based on your project's requirements.`
    },
    {
      question: "Can I get decorative concrete for my driveway?",
      answer: `Absolutely! Our ${formattedCity} concrete contractors offer various decorative options including stamped patterns, exposed aggregate, colored concrete, and more. These options can mimic the look of more expensive materials like pavers or natural stone while maintaining the durability and affordability of concrete.`
    },
    {
      question: "Do I need a permit to replace my driveway in your area?",
      answer: `Permit requirements vary across ${formattedState}. In ${formattedCity}, most driveway replacements require a permit, especially if changing the dimensions or affecting drainage. Our local contractors are familiar with ${formattedCity}'s specific permitting requirements and can either assist with the process or handle it entirely as part of your project.`
    },
    {
      question: `What's the best time of year to install a concrete driveway in ${formattedCity}?`,
      answer: `While our ${formattedCity} contractors can install driveways year-round, spring and fall typically offer ideal temperature and humidity conditions for concrete curing. That said, professional contractors have techniques to successfully pour concrete in both hot and cold weather. Many homeowners find better pricing and availability during off-peak seasons. Contact us to learn about current availability and any seasonal specials!`
    }
  ];
};
