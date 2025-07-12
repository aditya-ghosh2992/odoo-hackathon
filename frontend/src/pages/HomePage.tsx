import { Link } from 'react-router-dom';
import { ArrowRight, Users, Star, Shield, Zap } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: Users,
      title: 'Connect with Skilled People',
      description: 'Find people with the skills you need and offer your own expertise in return.',
    },
    {
      icon: Star,
      title: 'Quality Assurance',
      description: 'Our rating system ensures you connect with reliable and skilled users.',
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your privacy and security are our top priority with secure connections.',
    },
    {
      icon: Zap,
      title: 'Quick Matching',
      description: 'Find the perfect skill match in minutes with our intelligent search.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fadeIn">
              Exchange Skills,
              <span className="block text-secondary-200">Build Connections</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 animate-fadeIn">
              Join our community where knowledge meets opportunity. Share what you know, 
              learn what you need, and grow together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn">
              <Link
                to="/register"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary-400 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-400 rounded-full opacity-20 blur-3xl"></div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How SkillSwap Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to start exchanging skills and building meaningful connections
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Create Your Profile</h3>
                <p className="text-gray-600">
                  List the skills you offer and the skills you want to learn. Add your experience level and availability.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Find & Connect</h3>
                <p className="text-gray-600">
                  Browse profiles, search for specific skills, and send swap requests to potential skill partners.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Learn & Teach</h3>
                <p className="text-gray-600">
                  Meet up, exchange knowledge, and provide feedback. Build your reputation in our community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SkillSwap?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform is designed to make skill sharing safe, efficient, and rewarding
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <feature.icon className="w-12 h-12 text-primary-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Swapping Skills?</h2>
          <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
            Join thousands of learners and teachers in our growing community. 
            Your next skill exchange is just a click away.
          </p>
          <Link
            to="/register"
            className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center"
          >
            Join SkillSwap Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
