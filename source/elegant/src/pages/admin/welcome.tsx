import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { envVars } from '@/utils/core/envVarsCheck';

type WelcomeProps = {
  variables: {
    required: {
      [key: string]: boolean
    }
    optional: {
      [key: string]: boolean
    }
  }
}

export default function Welcome({ variables }: WelcomeProps) {
  return (
    <>
      <Head>
        <title>Welcome to Outstatic</title>
      </Head>
      <div id="outstatic">
        <div className="absolute bottom-10 w-full left-0 overflow-hidden z-0 md:-top-10">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1200 365"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-276.32 159.182C-232.477 130.613 -193.037 95.4797 -149.142 66.8773C-123.398 50.1026 -99.0091 30.5473 -69.5694 19.7442C-38.5686 8.36831 -2.85928 -3.31376 37.4064 4.54405C65.5725 10.0406 93.927 20.2194 125.473 43.3305C150.292 61.5127 166.609 84.5943 185.936 114.255C220.569 167.405 225.81 223.228 224.615 265.934C223.2 316.536 198.5 341.652 158.621 340.382C121.027 339.185 71.9868 320.328 45.0005 250.638C8.63388 156.723 111.095 159.937 149.344 159.325C235.509 157.945 334.997 185.056 433.145 218.102C547.034 256.448 651.041 336.753 780 356C940 384.5 1235.5 330.311 1237.95 70.5232"
              stroke="#1E293B"
              className="stroke-2 md:stroke-1"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <main className="relative flex h-screen flex-col items-center justify-center z-10 p-4">
          {/* <h1 className="mb-8 text-center text-xl font-semibold text-white">
            <svg
              fill="none"
              height="32"
              viewBox="0 0 775 135"
              width="200"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Outstatic"
            >
              <g fill="#1e293b">
                <path d="m63.9963 134.869c-11.3546 0-21.0957-1.913-29.2232-5.738-8.008-3.824-14.522-8.904-19.5419-15.239-5.02-6.454-8.72517-13.565-11.11562-21.3344-2.39045-7.769-3.585673-15.5379-3.585673-23.3069 0-7.5299 1.254983-15.1196 3.764953-22.769 2.62949-7.769 6.51394-14.8805 11.65344-21.3347 5.259-6.4543 11.773-11.6535 19.5419-15.59772 7.8885-3.94424 17.0917-5.91636 27.6097-5.91636 10.996 0 20.4383 1.97212 28.3268 5.91636 8.008 3.94422 14.5813 9.20322 19.7213 15.77692 5.139 6.4542 8.964 13.5061 11.474 21.1555 2.63 7.6494 3.944 15.2391 3.944 22.769 0 7.4104-1.314 15.0001-3.944 22.769-2.51 7.6495-6.394 14.7613-11.653 21.3343-5.14 6.455-11.5941 11.654-19.363 15.598-7.769 3.944-16.9722 5.917-27.6097 5.917zm.8964-9.323c6.9323 0 12.9084-1.554 17.9284-4.662 5.1394-3.107 9.3227-7.231 12.5498-12.37 3.3467-5.259 5.7971-10.9962 7.3511-17.2114 1.553-6.3347 2.33-12.6096 2.33-18.8248 0-7.6494-.896-15-2.689-22.0519-1.793-7.1713-4.5419-13.5658-8.2471-19.1833-3.5856-5.7371-8.0677-10.2192-13.4462-13.4463-5.3785-3.3466-11.5937-5.0199-18.6455-5.0199-6.9323 0-12.9682 1.6135-18.1077 4.8406-5.1394 3.2271-9.3227 7.4702-12.5498 12.7292-3.2271 5.1394-5.6773 10.8765-7.3506 17.2112-1.5538 6.2152-2.3307 12.4901-2.3307 18.8248 0 6.2151.8366 12.7889 2.5099 19.7212 1.6734 6.9323 4.2431 13.3865 7.7092 19.3626 3.4662 5.976 7.8885 10.817 13.267 14.522 5.4981 3.705 12.0718 5.558 19.7212 5.558z" />
                <path d="m179.299 134.869c-6.693 0-12.251-1.255-16.673-3.765-4.303-2.51-7.53-6.634-9.681-12.371-2.152-5.857-3.227-13.566-3.227-23.1276v-28.1475c0-2.0319 0-4.1235 0-6.2749.119-2.271.358-4.4821.717-6.6335-2.032.1195-4.183.239-6.454.3585-2.271 0-4.303.0598-6.096.1793v-9.502h4.303c5.976 0 10.458-.5379 13.446-1.6136s5.08-2.2111 6.275-3.4064h6.813v54.6815c0 9.4422 1.314 16.4942 3.944 21.1552 2.629 4.662 7.052 6.933 13.267 6.813 4.064 0 7.948-1.195 11.653-3.586 3.825-2.39 6.933-5.199 9.323-8.426v-42.4901c0-2.6295.06-5.0797.179-7.3507.12-2.3904.359-4.6613.718-6.8127-2.152.1195-4.363.239-6.634.3585-2.271 0-4.363.0598-6.275.1793v-9.502h5.199c5.259 0 9.383-.5379 12.371-1.6136s5.139-2.2111 6.454-3.4064h6.813l-.179 65.9767c0 1.912-.06 4.542-.18 7.888-.119 3.227-.298 6.096-.538 8.606 2.032-.12 4.124-.239 6.275-.359 2.271-.119 4.363-.179 6.275-.179v9.502h-28.506c-.239-1.912-.478-3.705-.717-5.379-.119-1.673-.299-3.286-.538-4.84-3.705 3.466-8.008 6.514-12.908 9.143-4.901 2.63-10.04 3.945-15.419 3.945z" />
                <path d="m283.918 134.869c-2.988 0-5.976-.419-8.964-1.255-2.988-.718-5.797-2.212-8.426-4.483-2.51-2.39-4.482-5.796-5.916-10.219-1.435-4.422-2.152-10.279-2.152-17.57l.359-48.9439h-13.267v-10.0399c3.227-.1196 6.514-1.3148 9.86-3.5857 3.347-2.2709 6.275-5.3187 8.785-9.1435 2.51-3.8247 4.243-7.9482 5.199-12.3705h8.427v25.0997h27.609v9.3227l-27.609.3586-.359 47.8687c0 4.5418.359 8.5458 1.076 12.0118.837 3.347 2.151 5.976 3.944 7.889 1.913 1.793 4.482 2.689 7.709 2.689 2.749 0 5.558-.837 8.427-2.51 2.988-1.673 5.796-4.422 8.426-8.247l6.096 5.378c-2.869 4.184-5.737 7.471-8.606 9.861-2.868 2.39-5.618 4.124-8.247 5.199-2.629 1.195-5.02 1.913-7.171 2.152-2.152.358-3.885.538-5.2.538z" />
                <path d="m358.946 134.869c-5.618 0-10.817-.777-15.598-2.331-4.781-1.434-8.605-3.168-11.474-5.199l.538 5.916h-9.502l-.897-30.837h7.53c.239 4.423 1.614 8.427 4.124 12.012 2.51 3.586 5.737 6.395 9.681 8.427 4.064 2.031 8.426 3.047 13.088 3.047 2.749 0 5.438-.418 8.068-1.255 2.629-.956 4.84-2.33 6.633-4.123 1.793-1.913 2.689-4.243 2.689-6.992 0-2.988-.956-5.439-2.868-7.351-1.793-2.032-4.303-3.825-7.53-5.378-3.108-1.5542-6.693-3.108-10.757-4.6618-3.586-1.4342-7.231-2.9282-10.936-4.482-3.586-1.5538-6.933-3.4064-10.04-5.5578-3.108-2.1514-5.558-4.7809-7.351-7.8885-1.793-3.2271-2.689-7.1714-2.689-11.8327 0-2.749.538-5.6773 1.613-8.7849 1.076-3.2271 2.809-6.1554 5.2-8.7849 2.39-2.749 5.617-4.9602 9.681-6.6335 4.064-1.7928 9.084-2.6893 15.06-2.6893 3.227 0 6.812.5379 10.757 1.6136 4.063 1.0757 7.828 2.9283 11.295 5.5578l-.18-6.2749h9.502v31.5539h-7.709c-.358-4.1833-1.494-8.0678-3.406-11.6535-1.793-3.5856-4.363-6.5139-7.709-8.7849-3.347-2.2709-7.411-3.4064-12.192-3.4064-4.661 0-8.486 1.1953-11.474 3.5857-2.868 2.2709-4.303 5.1395-4.303 8.6056 0 3.4662 1.076 6.275 3.227 8.4264 2.271 2.1514 5.2 4.004 8.785 5.5578 3.586 1.5537 7.47 3.1075 11.654 4.6613 5.02 2.0319 9.741 4.2431 14.163 6.6335 4.422 2.3905 8.008 5.3785 10.757 8.9642s4.124 8.1273 4.124 13.6253c0 5.976-1.554 10.996-4.662 15.06-2.988 3.944-6.872 6.873-11.653 8.785s-9.861 2.869-15.239 2.869z" />
                <path d="m439.216 134.869c-2.988 0-5.976-.419-8.964-1.255-2.988-.718-5.797-2.212-8.427-4.483-2.51-2.39-4.482-5.796-5.916-10.219-1.434-4.422-2.151-10.279-2.151-17.57l.358-48.9439h-13.267v-10.0399c3.227-.1196 6.514-1.3148 9.861-3.5857 3.346-2.2709 6.275-5.3187 8.785-9.1435 2.51-3.8247 4.243-7.9482 5.199-12.3705h8.426v25.0997h27.61v9.3227l-27.61.3586-.358 47.8687c0 4.5418.358 8.5458 1.075 12.0118.837 3.347 2.152 5.976 3.945 7.889 1.912 1.793 4.482 2.689 7.709 2.689 2.749 0 5.558-.837 8.426-2.51 2.988-1.673 5.797-4.422 8.426-8.247l6.096 5.378c-2.869 4.184-5.737 7.471-8.606 9.861-2.868 2.39-5.617 4.124-8.247 5.199-2.629 1.195-5.02 1.913-7.171 2.152-2.151.358-3.884.538-5.199.538z" />
                <path d="m528.944 132c-.239-1.912-.418-3.586-.537-5.02-.12-1.434-.299-2.928-.538-4.482-4.064 4.064-8.427 7.171-13.088 9.323-4.661 2.032-9.502 3.048-14.522 3.048-8.606 0-15.119-2.092-19.542-6.275-4.303-4.303-6.454-9.622-6.454-15.957 0-5.498 1.614-10.279 4.841-14.3423 3.227-4.0638 7.47-7.3507 12.729-9.8606 5.259-2.6295 10.996-4.5419 17.211-5.7371 6.215-1.3148 12.311-1.9721 18.287-1.9721v-10.5778c0-3.8247-.359-7.3506-1.076-10.5777-.717-3.3466-2.211-6.0359-4.482-8.0678-2.151-2.1514-5.558-3.2271-10.219-3.2271-3.108-.1195-6.215.4781-9.323 1.7929-3.107 1.1952-5.498 3.2271-7.171 6.0956.956.9562 1.554 2.0917 1.793 3.4064.358 1.1952.538 2.3307.538 3.4064 0 1.6733-.718 3.5857-2.152 5.7371-1.434 2.0318-3.884 2.988-7.35 2.8685-2.869 0-5.08-.9562-6.634-2.8685-1.434-2.0319-2.151-4.3626-2.151-6.9921 0-4.3028 1.553-8.1275 4.661-11.4741 3.227-3.3467 7.59-5.9762 13.088-7.8885 5.498-1.9124 11.653-2.8686 18.466-2.8686 10.279 0 17.928 2.6893 22.948 8.0678 5.14 5.3785 7.709 13.8646 7.709 25.4583v12.3705c0 3.9443-.059 7.8885-.179 11.8328v12.55c0 1.793-.06 3.825-.179 6.095-.12 2.271-.299 4.662-.538 7.172 2.032-.12 4.124-.239 6.275-.359 2.151-.119 4.183-.179 6.096-.179v9.502zm-1.613-43.0281c-3.825.2391-7.769.7769-11.833 1.6136-3.944.8366-7.53 2.0916-10.757 3.7649s-5.856 3.8247-7.888 6.4546c-1.913 2.629-2.869 5.796-2.869 9.502.239 4.063 1.554 7.051 3.944 8.964 2.51 1.912 5.439 2.868 8.785 2.868 4.184 0 7.889-.777 11.116-2.33 3.227-1.674 6.394-3.945 9.502-6.813-.12-1.315-.179-2.63-.179-3.944 0-1.435 0-2.929 0-4.482 0-1.076 0-3.048 0-5.9168.119-2.988.179-6.2151.179-9.6813z" />
                <path d="m602.217 134.869c-2.988 0-5.976-.419-8.964-1.255-2.988-.718-5.797-2.212-8.427-4.483-2.51-2.39-4.482-5.796-5.916-10.219-1.434-4.422-2.151-10.279-2.151-17.57l.358-48.9439h-13.267v-10.0399c3.227-.1196 6.514-1.3148 9.861-3.5857 3.346-2.2709 6.275-5.3187 8.785-9.1435 2.51-3.8247 4.243-7.9482 5.199-12.3705h8.426v25.0997h27.61v9.3227l-27.61.3586-.358 47.8687c0 4.5418.358 8.5458 1.075 12.0118.837 3.347 2.152 5.976 3.945 7.889 1.912 1.793 4.482 2.689 7.709 2.689 2.749 0 5.558-.837 8.426-2.51 2.988-1.673 5.797-4.422 8.426-8.247l6.096 5.378c-2.868 4.184-5.737 7.471-8.606 9.861-2.868 2.39-5.617 4.124-8.247 5.199-2.629 1.195-5.02 1.913-7.171 2.152-2.151.358-3.884.538-5.199.538z" />
                <path d="m639.057 124.47c3.585 0 6.095-.837 7.53-2.51 1.434-1.673 2.271-4.004 2.51-6.992.358-2.988.538-6.454.538-10.398v-37.1121c0-2.0319.059-4.0638.179-6.0957.119-2.1514.299-4.4223.538-6.8127-2.032.1195-4.184.239-6.455.3585-2.27 0-4.362.0598-6.275.1793v-9.502c5.379 0 9.622-.2391 12.73-.7172 3.227-.5976 5.677-1.2549 7.35-1.9721 1.793-.7171 3.108-1.494 3.945-2.3307h6.812v69.2037c0 2.151-.059 4.362-.179 6.633-.119 2.152-.299 4.363-.538 6.634 1.913-.12 3.825-.179 5.737-.179 2.032-.12 3.885-.24 5.558-.359v9.502h-39.98zm19.183-100.3988c-3.107 0-5.737-1.1354-7.888-3.4063-2.152-2.3905-3.227-5.259-3.227-8.6057 0-3.34658 1.135-6.15536 3.406-8.42628 2.271-2.39045 4.841-3.5856788 7.709-3.5856788 3.108 0 5.677 1.1952288 7.709 3.5856788 2.152 2.27092 3.227 5.0797 3.227 8.42628 0 3.3467-1.075 6.2152-3.227 8.6057-2.032 2.2709-4.601 3.4063-7.709 3.4063z" />
                <path d="m735.314 134.869c-8.008 0-15.359-1.793-22.052-5.379-6.693-3.705-12.072-8.964-16.136-15.777-3.944-6.813-5.916-15.0598-5.916-24.7411 0-6.4542 1.136-12.6096 3.407-18.4662 2.27-5.9761 5.438-11.2949 9.502-15.9562 4.183-4.6614 9.083-8.3068 14.701-10.9363 5.737-2.7491 12.072-4.1236 19.004-4.1236 7.052 0 13.088 1.0757 18.108 3.2271 5.019 2.1514 8.844 4.9602 11.474 8.4264 2.749 3.4661 4.123 7.2311 4.123 11.2948 0 2.8686-.837 5.3785-2.51 7.5299-1.673 2.1515-4.064 3.2272-7.171 3.2272-3.466.1195-5.917-.8965-7.351-3.0479-1.434-2.2709-2.151-4.3625-2.151-6.2749 0-1.0757.179-2.2709.538-3.5857.358-1.4342 1.016-2.6892 1.972-3.7649-.956-2.51-2.51-4.3626-4.662-5.5578-2.151-1.1952-4.362-1.9721-6.633-2.3307s-4.183-.5379-5.737-.5379c-7.291.1196-13.446 3.2869-18.466 9.5021-4.901 6.0956-7.351 14.9403-7.351 26.5339 0 7.4104 1.076 14.0439 3.227 19.9008 2.271 5.856 5.558 10.518 9.861 13.984s9.442 5.259 15.418 5.378c5.379 0 10.578-1.374 15.598-4.123 5.02-2.869 9.083-6.454 12.191-10.757l5.737 5.02c-3.466 5.378-7.47 9.621-12.012 12.729-4.422 3.107-8.964 5.319-13.625 6.633-4.542 1.315-8.905 1.973-13.088 1.973z" />
              </g>
            </svg>
          </h1> */}
          <div className="mb-20 max-w-2xl p-8 px-4 md:p-8 text-black bg-white rounded-lg border border-gray-200 shadow-md">
            <p className="mb-5">
              Before you can access your admin area, make sure the following
              environment variables are set up:
            </p>
            <ul className="mb-5">
              {Object.entries(variables.required).map(([key, value]) => (
                <li key={key} className="mb-1">
                  {`${value ? '✅' : '❌'} Variable`}{' '}
                  <span className="font-semibold">{key}</span>{' '}
                  {`is ${value ? 'set.' : 'missing!'}`}
                </li>
              ))}
            </ul>
            {!variables.optional.OST_CONTENT_PATH && (
              <p className="mb-5 p-2 bg-blue-100 rounded">
                Optional variable{' '}
                <span className="font-semibold">OST_CONTENT_PATH</span> defines
                where your content is saved.
                <br />
                Defaulting to <code>outstatic/content</code>
              </p>
            )}
            {!variables.optional.OST_REPO_OWNER && (
              <p className="mb-5 p-2 bg-blue-100 rounded">
                Optional variable{' '}
                <span className="font-semibold">OST_REPO_OWNER</span> is not
                set.
                <br />
                Defaulting to your GitHub user.
              </p>
            )}
            <p>You need to restart Next.js to apply the changes.</p>
          </div>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (!envVars.hasMissingEnvVars) {
    context.res.writeHead(302, {
      Location: '/admin'
    })
    context.res.end()
  }

  console.log({ envVars })

  return {
    props: {
      variables: envVars.envVars
    }
  }
}
