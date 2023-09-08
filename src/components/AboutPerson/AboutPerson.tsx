import { Box } from '@mui/material';

import styles from './AboutPerson.module.scss';

type Props = {
  reverse?: boolean;
};

const AboutPerson: React.FC<Props> = ({ reverse }) => (
  <Box
    sx={{
      display: 'flex',
      m: '20px 0',
      gap: '40px',
      alignItems: 'center',
      flexDirection: reverse ? 'row-reverse' : 'row',
    }}
  >
    <Box>
      <Box sx={{ width: '400px', height: '400px' }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          disableRemotePlayback
          disablePictureInPicture
          className={styles.personVideo}
        >
          <source
            src="https://d33wubrfki0l68.cloudfront.net/80ba53fae2eb5d0d055fe3a721d5b193011666bc/6ad35/assets/jim.webm"
            type="video/webm"
          />
          <source
            src="https://d33wubrfki0l68.cloudfront.net/a308217d442f1d4b092baea3b0c61b489815677f/b2e59/assets/jim.mp4"
            type="video/mp4"
          />
        </video>
      </Box>
    </Box>
    <Box>
      <strong>Tischenko Vladislav</strong>
      <p>Role: Chief Coordinator</p>
      <p>
        <em>Age:</em> 35 years old
        <br />
        <em>Personality:</em> Spirited and happily married
      </p>

      <p>
        My primary role within the team was to maintain <strong>morale</strong> and a{' '}
        <strong>positive atmosphere</strong>. On this project, I undertook significant responsibilities, including:
      </p>

      <ul>
        <li>Creating the project structure and establishing the build system.</li>
        <li>Managing everything related to forms, routing, and sliders.</li>
        <li>
          Contributing to the development of <strong>filters</strong>, <strong>sorting mechanisms</strong>, and{' '}
          <strong>search functionalities</strong>.
        </li>
        <li>
          Successfully implementing <strong>registration notifications</strong> and <strong>seamless redirects</strong>{' '}
          to the main page.
        </li>
        <li>
          Handling various <strong>modal dialogs</strong>.
        </li>
        <li>
          Ensuring comprehensive <strong>unit test coverage</strong> and crafting fundamental layout components.
        </li>
      </ul>

      <p>
        I&apos;d like to take a moment to express my deep <strong>gratitude</strong> to my extraordinary colleagues.
        Each one of you is truly exceptional, and I consider myself incredibly fortunate to have had the privilege of
        working alongside such an outstanding team.
      </p>

      <p>
        Olya, your leadership skills are <strong>outstanding</strong>, and your friendship is truly treasured. Thank you
        for your invaluable <strong>guidance</strong> and <strong>unwavering patience</strong>.
      </p>

      <p>
        Vika, you possess the <strong>sharpest mind</strong> I&apos;ve ever encountered (I still have my doubts that
        you&apos;re human). Your ability to tackle the most daunting challenges with ease leaves me in awe. Vika, you
        are our <strong>superhero</strong>, and our achievements would not have been possible without you.
      </p>

      <p>
        I want to extend my heartfelt <strong>thanks</strong> to all of you for your{' '}
        <strong>unwavering dedication</strong> and
        <strong>hard work</strong>. Our journey together has been nothing short of <strong>incredible</strong>, and I
        eagerly anticipate achieving even greater success as we continue to work together in the future.
      </p>
    </Box>
  </Box>
);

export default AboutPerson;
