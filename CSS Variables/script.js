const inputs = document.querySelectorAll('.controls input');

    function handleUpdate() {
        // As we need to add px to the values in case of padding and blur, but the value of color has to be passed like that,
        // dataset gives us all the data attribute of the HTLM tag
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));