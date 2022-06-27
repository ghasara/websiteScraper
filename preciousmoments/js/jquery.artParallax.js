(function ($, ScrollMagic, TimelineMax, TweenMax, undefined) {

	$.fn.artParallax = function (options) {

		var settings = $.extend({
			factor: 0.3,
			ScrollMagicController: undefined,
			SmoothScrollController: undefined,
		}, options);

		if (typeof settings.ScrollMagicController === undefined) {
			settings.ScrollMagicController = new ScrollMagic.Controller();
		}

		/**
		 * Add scene to ScrollMagic controller
		 */
		function addToScrollMagic(options = {
			trigger,
			duration,
			timeline,
			controller
		}) {

			return new ScrollMagic.Scene({
				triggerElement: options.trigger,
				triggerHook: 1,
				duration: options.duration
			})
				.setTween(options.timeline)
				.addTo(options.controller)
				.update(true);

		};

		/**
		 * Create parallax timeline
		 */
		function getParallaxTimeline(options = {
			element,
			fromY,
			fromX,
			toY,
			toX,
			scale
		}) {

			var tl = new TimelineMax();

			return tl.fromTo(options.element, 1, {
				y: options.fromY || null,
				x: options.fromX || null,
				scale: options.scale || null,
			}, {
				roundProps: {
					x: 0.01,
					y: 0.01,
					z: 0.01,
					scale: 0.01
				},
				y: options.toY || null,
				x: options.toX || null,
				z: 0.01,
				force3D: true,
				ease: Linear.easeNone,
				transformOrigin: 'center center',
			});

		};

		return this.each(function () {

			var
				$this = $(this),
				$img = $this.find('.art-parallax__wrapper'),
				distanceToY = $this.data('art-parallax-y') || 0,
				distanceToX = $this.data('art-parallax-x') || 0,
				scene,
				sceneDuration = window.innerHeight + $img.height(),
				tl;

			// wrong calculated height
			if (sceneDuration - window.innerHeight < 50) {
				sceneDuration = window.innerHeight + $this.parent().height();
			}

			if (!$img.length && !distanceToX && !distanceToY) {
				return;
			}

			tl = new TimelineMax();

			if ($img.is('.art-parallax__wrapper')) {

				var
					factor = parseFloat($this.data('art-parallax-factor')) || parseFloat(settings.factor),
					factorTo = Math.abs(factor) * 100,
					factorFrom = -1 * factor * 100,
					factorScale = 1 + Math.abs(factor * 2);

				if (factorFrom > 0) {
					factorScale = factorScale * factorScale;
					factorTo = factor * 100;
				}

				// create timeline for the element
				tl = getParallaxTimeline({
					element: $img,
					fromX: '0%',
					fromY: factorFrom + '%',
					toY: factorTo + '%',
					toX: '0%',
					scale: factorScale
				});

			} else {

				tl = getParallaxTimeline({
					element: $this,
					toY: distanceToY,
					toX: distanceToX
				});

			}

			// add scene to ScrollMagic controller
			scene = addToScrollMagic({
				trigger: $this,
				duration: sceneDuration,
				timeline: tl,
				controller: settings.ScrollMagicController
			});

		});

	}

})(jQuery, ScrollMagic, TimelineMax, TweenMax);
