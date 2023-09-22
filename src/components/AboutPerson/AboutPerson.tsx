import GitHubIcon from '@mui/icons-material/GitHub';
import { Box } from '@mui/material';

import styles from './AboutPerson.module.scss';
import { info } from './InfoAboutPerson';

const AboutPerson: React.FC = () => (
  <Box>
    {info.map((person, index) => (
      <Box
        key={index}
        sx={{
          display: 'flex',
          m: '20px 0',
          p: '20px 0',
          gap: '60px',
          alignItems: 'center',
          flexDirection: index % 2 !== 0 ? 'row-reverse' : 'row',
          borderBottom: '2px solid grey',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          justifyContent: 'center',
        }}
      >
        <Box>
          <Box sx={{ width: { xl: '400px', sm: '400px' } }}>
            <video
              autoPlay
              loop
              muted
              playsInline
              disableRemotePlayback
              disablePictureInPicture
              className={index % 2 !== 0 ? styles.personVideoEven : styles.personVideoOdd}
            >
              <source src={person.videoSource} type="video/mp4" />
            </video>
          </Box>
        </Box>
        <Box>
          <Box>
            <strong className={styles.name}>{person.name}</strong>
            <p>Role: {person.role}</p>
            <p>
              <em>Age:</em> {person.age} years old
              <br />
              <em>Personality:</em> {person.personality}
            </p>
            <Box dangerouslySetInnerHTML={{ __html: person.presentation }}></Box>
          </Box>

          <a href={person.gitHubLink} className={styles.link} target="_blank" rel="noopener noreferrer">
            <GitHubIcon className={styles.icon} />
            {person.name} GitHub Profile
          </a>
        </Box>
      </Box>
    ))}
  </Box>
);

export default AboutPerson;
