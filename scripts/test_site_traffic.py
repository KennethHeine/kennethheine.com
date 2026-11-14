"""Regression checks for incomplete or failed Azure metrics responses."""
import importlib.util
import unittest
from pathlib import Path

spec = importlib.util.spec_from_file_location('site_traffic', Path(__file__).with_name('site-traffic.py'))
traffic = importlib.util.module_from_spec(spec)
spec.loader.exec_module(traffic)


def metric(data, **fields):
    return {'name': {'value': 'SiteHits'}, 'timeseries': [{'data': data}], **fields}


class TrafficTests(unittest.TestCase):
    def test_missing_metrics_are_not_zero(self):
        rows = traffic.summarize({'value': []}, 7)
        self.assertTrue(all(row['total'] is None for row in rows))

    def test_missing_days_remain_visible_in_partial_total(self):
        payload = {'value': [metric([{'total': 2}, {}, {'total': 3}])]}
        row = traffic.summarize(payload, 3)[0]
        self.assertEqual((row['total'], row['measured_days'], row['requested_days']), (5, 2, 3))

    def test_measured_zero_is_distinct_from_no_data(self):
        row = traffic.summarize({'value': [metric([{'total': 0}])]}, 1)[0]
        self.assertEqual((row['total'], row['measured_days']), (0, 1))

    def test_metric_failure_is_not_silently_a_zero(self):
        with self.assertRaisesRegex(ValueError, 'could not return'):
            traffic.summarize({'value': [metric([], errorCode='InternalServerError')]}, 1)

    def test_split_series_cannot_be_double_counted(self):
        with self.assertRaisesRegex(ValueError, 'split series'):
            traffic.summarize({'value': [metric([], timeseries=[{'data': []}, {'data': []}])]}, 1)


if __name__ == '__main__':
    unittest.main()
