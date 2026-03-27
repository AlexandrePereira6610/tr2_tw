

  var data = [
    { area: 'e-Saúde', projetos: 12, cor: '#2ecc71' },
    { area: 'IA em Saúde', projetos: 8, cor: '#1e56d0' },
    { area: 'Telemedicina', projetos: 6, cor: '#4a7ef5' },
    { area: 'Biotech', projetos: 5, cor: '#7da4f8' },
    { area: 'Epidemiologia', projetos: 9, cor: '#27ae60' },
    { area: 'Genómica', projetos: 4, cor: '#b0c8fb' }
  ];

  /**
   * Cria o gráfico de barras dos projetos de investigação usando a biblioteca D3.js.
   */
  function createChart() {
    if (typeof d3 === 'undefined') {
      console.warn('[CACA] D3.js não está disponível.');
      return;
    }

    var container = document.getElementById('d3-chart');
    if (!container) return;

    container.innerHTML = '';

    var containerWidth = container.clientWidth;
    var margin = { top: 20, right: 40, bottom: 40, left: 120 };
    var width = containerWidth - margin.left - margin.right;
    var height = data.length * 52;

    if (width < 200) width = 200;

    var svg = d3.select('#d3-chart')
      .append('svg')
      .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var xScale = d3.scaleLinear()
      .domain([0, d3.max(data, function (d) { return d.projetos; }) * 1.15])
      .range([0, width]);

    var yScale = d3.scaleBand()
      .domain(data.map(function (d) { return d.area; }))
      .range([0, height])
      .padding(0.35);

    svg.append('g')
      .attr('class', 'd3-axis d3-axis--y')
      .call(d3.axisLeft(yScale).tickSize(0).tickPadding(12))
      .select('.domain')
      .remove();

    svg.selectAll('.d3-axis--y text')
      .style('font-size', '13px')
      .style('font-weight', '500')
      .style('fill', '#4b5563')
      .style('font-family', 'Inter, sans-serif');

    svg.append('g')
      .attr('class', 'd3-grid')
      .selectAll('line')
      .data(xScale.ticks(5))
      .enter()
      .append('line')
      .attr('x1', function (d) { return xScale(d); })
      .attr('x2', function (d) { return xScale(d); })
      .attr('y1', 0)
      .attr('y2', height)
      .attr('stroke', '#e2e6ef')
      .attr('stroke-dasharray', '3,3')
      .attr('stroke-width', 1);

    var tooltip = d3.select('body')
      .append('div')
      .attr('class', 'd3-tooltip')
      .style('opacity', 0);

    var bars = svg.selectAll('.d3-bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'd3-bar')
      .attr('y', function (d) { return yScale(d.area); })
      .attr('height', yScale.bandwidth())
      .attr('x', 0)
      .attr('width', 0)
      .attr('fill', function (d) { return d.cor; })
      .attr('rx', 6)
      .attr('ry', 6)
      .style('cursor', 'pointer');

    var labels = svg.selectAll('.d3-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'd3-label')
      .attr('y', function (d) { return yScale(d.area) + yScale.bandwidth() / 2; })
      .attr('x', 0)
      .attr('dy', '0.35em')
      .attr('dx', '8')
      .text(function (d) { return d.projetos + ' projetos'; })
      .style('font-size', '12px')
      .style('font-weight', '600')
      .style('fill', '#374151')
      .style('font-family', 'Inter, sans-serif')
      .style('opacity', 0);

    /**
     * Inicia a animação das barras e das etiquetas do gráfico usando D3.js.
     */
    function animateBars() {
      bars.transition()
        .duration(800)
        .delay(function (d, i) { return i * 100; })
        .ease(d3.easeCubicOut)
        .attr('width', function (d) { return xScale(d.projetos); });

      labels.transition()
        .duration(400)
        .delay(function (d, i) { return 400 + i * 100; })
        .style('opacity', 1)
        .attr('x', function (d) { return xScale(d.projetos); });
    }

    if ('IntersectionObserver' in window) {
      var chartObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateBars();
            chartObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      chartObserver.observe(container);
    } else {
      animateBars();
    }

    bars
      .on('mouseover', function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('opacity', 0.85)
          .attr('height', yScale.bandwidth() + 4)
          .attr('y', function () { return yScale(d.area) - 2; });

        tooltip
          .style('opacity', 1)
          .html(
            '<strong>' + d.area + '</strong><br>' +
            d.projetos + ' projetos ativos'
          )
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 40) + 'px');
      })
      .on('mousemove', function (event) {
        tooltip
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 40) + 'px');
      })
      .on('mouseout', function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('opacity', 1)
          .attr('height', yScale.bandwidth())
          .attr('y', yScale(d.area));

        tooltip.style('opacity', 0);
      });
  }

  /**
   * Inicializa o gráfico, aguardando caso o D3.js ainda não tenha carregado totalmente.
   */
  function init() {
    if (typeof d3 !== 'undefined') {
      createChart();
    } else {
      setTimeout(function () {
        if (typeof d3 !== 'undefined') {
          createChart();
        }
      }, 500);
    }
  }

  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('load', init);
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var existingTooltip = document.querySelector('.d3-tooltip');
      if (existingTooltip) existingTooltip.remove();
      createChart();
    }, 300);
  });
