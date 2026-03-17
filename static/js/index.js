window.HELP_IMPROVE_VIDEOJS = false;

function copyBibTeX() {
  const bibtexElement = document.getElementById('bibtex-code');
  const button = document.querySelector('.copy-bibtex-btn');
  const copyText = button ? button.querySelector('.copy-text') : null;

  if (!bibtexElement || !button || !copyText) {
    return;
  }

  const text = bibtexElement.textContent;

  navigator.clipboard.writeText(text).then(function() {
    button.classList.add('copied');
    copyText.textContent = 'Cop';

    setTimeout(function() {
      button.classList.remove('copied');
      copyText.textContent = 'Copy';
    }, 2000);
  }).catch(function() {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    button.classList.add('copied');
    copyText.textContent = 'Cop';

    setTimeout(function() {
      button.classList.remove('copied');
      copyText.textContent = 'Copy';
    }, 2000);
  });
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

window.addEventListener('scroll', function() {
  const scrollButton = document.querySelector('.scroll-to-top');
  if (!scrollButton) {
    return;
  }

  if (window.pageYOffset > 300) {
    scrollButton.classList.add('visible');
  } else {
    scrollButton.classList.remove('visible');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const playbackVideos = document.querySelectorAll('video[data-playback-rate]');
  playbackVideos.forEach(function(video) {
    const playbackRate = Number(video.getAttribute('data-playback-rate'));
    if (!Number.isNaN(playbackRate) && playbackRate > 0) {
      video.playbackRate = playbackRate;
      video.defaultPlaybackRate = playbackRate;
    }
  });

  const toggleButtons = document.querySelectorAll('.video-toggle-btn');

  toggleButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const targetId = button.getAttribute('data-target');
      const target = targetId ? document.getElementById(targetId) : null;

      if (!target) {
        return;
      }

      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      target.classList.toggle('is-collapsed', isExpanded);
      button.setAttribute('aria-expanded', String(!isExpanded));

      if (targetId === 'aloha-extra-videos') {
        button.textContent = isExpanded ? 'Show 3 More' : 'Show Less';
      } else if (targetId === 'libero-extra-videos') {
        button.textContent = isExpanded ? 'Show 2 More' : 'Show Less';
      }
    });
  });
});
