import { advantagesItems } from '@/constants/advantagesItems';
import Title from '../../ui/Title/Title';
import { labels } from '@/constants/labels';
import './About.css';

export default function About() {
  return (
    <div className='about'>
      {/* Description Section */}
      <div className='about__description'>
        <div className='about__title'>
          <Title text={labels.titles.aboutTitle} />
        </div>

        <p className='about__text'>{labels.descriptions.aboutTextFirst}</p>

        <p className='about__text'>{labels.descriptions.aboutTextSecond}</p>

        <p className='about__text'>{labels.descriptions.aboutTextThird}</p>
      </div>

      <div className='about__advantages'>
        <div className='advantages'>
          {advantagesItems.map((item) => (
            <div
              key={item.id}
              className='advantages__item'
            >
              <div className='advantages__icon'>{item.icon}</div>

              <div>
                <h4 className='advantages__title'>{item.title}</h4>
                <p className='advantages__text'>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
