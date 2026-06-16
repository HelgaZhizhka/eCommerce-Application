import { cn } from '../../shared/lib/cn';
import { info } from './InfoAboutPerson';

const AboutPerson: React.FC = () => (
  <div>
    {info.map((person, index) => (
      <div
        key={index}
        className={cn(
          'my-5 flex flex-wrap items-center justify-center gap-[60px] border-b-2 border-gray py-5 md:flex-nowrap',
          index % 2 !== 0 ? 'flex-row-reverse' : 'flex-row'
        )}
      >
        <div>
          <div className="sm:w-[400px]">
            <video
              autoPlay
              loop
              muted
              playsInline
              disableRemotePlayback
              disablePictureInPicture
              className={cn('w-full p-2.5 shadow-[12px_12px_10px_#ccc]', index % 2 !== 0 ? 'rotate-2' : '-rotate-2')}
            >
              <source src={person.videoSource} type="video/mp4" />
            </video>
          </div>
        </div>
        <div>
          <div>
            <strong className="text-2xl">{person.name}</strong>
            <p>Role: {person.role}</p>
            <p>
              <em>Age:</em> {person.age} years old
              <br />
              <em>Personality:</em> {person.personality}
            </p>
            <div dangerouslySetInnerHTML={{ __html: person.presentation }}></div>
          </div>

          <a
            href={person.gitHubLink}
            className="flex items-center justify-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="mr-2" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
              <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.21 3.44 9.63 8.21 11.19.6.11.82-.25.82-.56v-2.02c-3.34.71-4.04-1.58-4.04-1.58-.55-1.36-1.34-1.72-1.34-1.72-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.79 2.81 1.27 3.49.97.11-.76.42-1.27.76-1.56-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.21a11.6 11.6 0 0 1 3-.4c1.02 0 2.05.13 3 .4 2.29-1.53 3.3-1.21 3.3-1.21.66 1.66.24 2.88.12 3.18.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.53-5.49 5.82.43.36.81 1.08.81 2.18v3.23c0 .31.22.68.83.56C20.56 21.91 24 17.5 24 12.29 24 5.78 18.63.5 12 .5z" />
            </svg>
            {person.name} GitHub Profile
          </a>
        </div>
      </div>
    ))}
  </div>
);

export default AboutPerson;
